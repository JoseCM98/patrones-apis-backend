const empleadoCtrl={};
const Empleado = require('../models/Empleado')
empleadoCtrl.getEmpleados= async(req,res)=>{
    const empleados = await Empleado.find();
    res.json(empleados)
}
empleadoCtrl.createEmpleado = async(req,res)=>{
    console.log(req.body)
    const empleado=new Empleado({
 nombre: req.body.nombre,
 cargo: req.body.cargo,
 departamento:req.body.departamento,
 sueldo:req.body.sueldo
 });
 await empleado.save();
 res.json('status: Datos guardados');
}
empleadoCtrl.getEmpleado=async(req,res)=>{
    const empleado = await Empleado.findById(req.params.id);
    res.json(empleado);
}

empleadoCtrl.editEmpleado= async(req,res)=>{
    const {id}=req.params;
 const empleado={
 nombre: req.body.nombre,
 cargo: req.body.cargo,
 departamento: req.body.departamento,
 sueldo: req.body.sueldo
 };
 
 const actualizado = await Empleado.findByIdAndUpdate(id, {$set:empleado},{new: true});
 res.json(actualizado);
}
empleadoCtrl.deleteEmpleado= async(req,res)=>{
await Empleado.findByIdAndDelete(req.params.id);
 res.json('status: Empleado ha sido removido');
}
module.exports=empleadoCtrl;