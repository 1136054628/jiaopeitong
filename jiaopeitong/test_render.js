// 运行时自检：在 Node 里用轻量 DOM 桩运行 app.js，渲染所有页面/表单/报表
const fs = require('fs');
const vm = require('vm');

function makeEl() {
  return {
    innerHTML: '', style: {}, dataset: {}, _value: '',
    classList: { add(){}, remove(){}, toggle(){} },
    addEventListener(){}, appendChild(){}, remove(){},
    set value(v){ this._value = v; }, get value(){ return this._value; },
    closest(){ return null; },
    querySelector(){ return makeEl(); },
    querySelectorAll(){ return []; },
    focus(){},
  };
}

const _store = {};
const sandbox = {
  document: { addEventListener(){}, querySelector(){ return makeEl(); }, querySelectorAll(){ return []; } },
  localStorage: { getItem: k => (_store[k] != null ? _store[k] : null), setItem: (k,v)=>{ _store[k]=String(v); }, removeItem: k=>{ delete _store[k]; } },
  window: null,
  setTimeout: (fn)=>{}, clearTimeout: ()=>{},
  Blob: function(){}, URL: { createObjectURL: ()=>{}, revokeObjectURL: ()=>{} },
  confirm: ()=>{ return true; },
  console, Date, Math, JSON,
};
sandbox.window = sandbox;
sandbox.self = sandbox;
vm.createContext(sandbox);

const appSrc = fs.readFileSync(__dirname + '/app.js', 'utf8');

const testCode = `
;console.log('== render self-check ==');
const secs = ['home','students','teachers','classes','schedule','import'];
secs.forEach(sec => {
  S.section = sec; S.tab = ''; S.sel = null; S.detail = null;
  try { const h = RENDER[sec](); if (typeof h !== 'string' || !h.length) throw new Error('empty'); console.log('OK  section  ' + sec + '  (' + h.length + ' chars)'); }
  catch(e){ console.log('FAIL section ' + sec + ' -> ' + e.message); }
});
// 应用默认以空数据启动，注入一条测试数据以校验详情页与表单渲染
db.set('students', [{id:'tst', name:'测试学生', gender:'男', grade:'三年级', subjects:['数学'], tags:['正式'], phone:'13000000000', parentName:'测试家长', parentPhone:'13000000000', remainingHours:5, classIds:['tcl'], enrollDate:daysAgo(3), note:''}]);
db.set('teachers', [{id:'tt1', name:'测试老师', gender:'女', subjects:['数学'], certs:['教师资格证'], teachYears:2, hourlyRate:100, experience:'测试', status:'在职', hireDate:daysAgo(100)}]);
db.set('classes', [{id:'tcl', name:'测试班级', type:'小班', subject:'数学', teacherId:'tt1', schedule:'周六 09:00', pricePerHour:100, studentIds:['tst'], status:'进行中', startDate:daysAgo(10)}]);
db.set('evaluations', [{id:'ev1', teacherId:'tt1', rating:4.5, comment:'测试评价', date:daysAgo(1)}]);
const st = coll.students()[0], tc = coll.teachers()[0], cl = coll.classes()[0];
try { renderStudentDetail(st.id); console.log('OK  student detail'); } catch(e){ console.log('FAIL student detail -> ' + e.message); }
try { renderTeacherDetail(tc.id); console.log('OK  teacher detail'); } catch(e){ console.log('FAIL teacher detail -> ' + e.message); }
try { renderClassDetail(cl.id); console.log('OK  class detail'); } catch(e){ console.log('FAIL class detail -> ' + e.message); }
S.sel = { kind:'student', id: st.id };
try { renderSchedule(); console.log('OK  schedule person'); } catch(e){ console.log('FAIL schedule person -> ' + e.message); }
try { studentForm(st); teacherForm(tc); classForm(cl); consumeForm(st); rechargeForm(st); salaryForm(tc); feeForm(); commForm(); noticeForm(); visitForm(); feedbackForm(); sessionForm(); evalForm(); console.log('OK  all forms'); } catch(e){ console.log('FAIL forms -> ' + e.message); }
['day','week','month','year'].forEach(p => { S.reportPeriod = p; try { renderReport(); console.log('OK  report ' + p); } catch(e){ console.log('FAIL report ' + p + ' -> ' + e.message); } });
S.tab = 'consume'; try { renderStudents(); } catch(e){ console.log('FAIL students consume tab -> ' + e.message); }
S.tab = 'stat'; try { renderHoursStat('student'); renderHoursStat('teacher'); console.log('OK  hours stat'); } catch(e){ console.log('FAIL hours stat -> ' + e.message); }
S.tab = 'pay'; try { renderTeachers(); } catch(e){ console.log('FAIL teachers pay tab -> ' + e.message); }
S.tab = 'eval'; try { renderTeacherEval(); console.log('OK  teacher eval'); } catch(e){ console.log('FAIL teacher eval -> ' + e.message); }
S.section = 'import'; S.tab = 'backup'; try { renderBackup(); console.log('OK  backup'); } catch(e){ console.log('FAIL backup -> ' + e.message); }
console.log('== done ==');
`;

try {
  vm.runInContext(appSrc + '\n' + testCode, sandbox, { filename: 'app.js' });
} catch (e) {
  console.log('LOAD FAILURE:', e.message);
  process.exit(1);
}
