const {Schema, model}=require('mongoose');
const departamentoSchema=new Schema({
 nombre:{type:String, required:true},
 slogan:{type:String, required: true},
}, {timestamps:true,
 versionKey:false
})
module.exports=model("Departamento",departamentoSchema);