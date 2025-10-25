const empleados = require('./sample');
const Empleado = require('./models/Empleado');
const Departamento = require('./models/Departamento');
const resolvers = {
  Mutation:{
async createEmpleado(_,{input})
{
const nuevo = new Empleado(input);
nuevo.save();
empleados.push(input);
return input;
}
},
 Mutation:{
async createDepartamento(_,{input})
{
const nuevo = new Departamento(input);
nuevo.save();
return input;
}
},
Query:{
saludar(root,{name},context){
console.log(context);
return `Hola ${name}!`;
},
empleados(){
return Empleado.find();
},
departamentos(){
return Departamento.find();
}
}

};

module.exports = resolvers;