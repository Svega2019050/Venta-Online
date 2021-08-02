'use strict'

const userModel = require('../models/user.model');
const categoryModel = require('../models/category.model');


/* Save Category */
function saveCategory(req,res) {
    let userId = req.params.userId;
    let category = new categoryModel();
    let params = req.body;

    if (userId != req.user.sub) {
        return res.status(401).send({message: 'No tiene permiso para realizar esta acción '});
    }else{
        userModel.findById(userId,(err,userFind)=>{
            if (err) {
                return res.status(500).send({message: 'Error General',err});
            }else if(userFind) {
                if (params.nameCategory) {
                    category.nameCategory = params.nameCategory.toLowerCase();
                    category.description = params.description;
    
                    category.save((err,categorySave)=>{
                        if (err) {
                            return res.status(500).send({message: 'Error General',err});
                        }else if(categorySave) {
                            userModel.findByIdAndUpdate(userId,{$push:{category: categorySave}},{new: true},(err,categoryPush)=>{
                                if (err) {
                                    return res.status(500).send({message: 'Error General',err});
                                }else if(categoryPush) {
                                    return res.send({message: 'Categoria Guardada Con Exito',categoryPush});
                                } else {
                                    return res.status(403).send({message: 'Erro al guardar Categoria'});
                                }
                            }).populate('category');
                        } else {
                            return res.status(403).send({message: 'Erro al guardar Categoria'});
                        }
                    });
                } else {
                    return res.status(403).send({message: 'Faltan Datos'})
                }
                
    
    
            } else {
                return res.status(401).send({message: 'Usuario Inexistente'});
            }
        });
    }


}

/* Update Category*/
function updateCategory(req,res) {
    let userId = req.params.userId;
    let categoryId = req.params.categoryId;
    let params = req.body;
    let payload  = req.user;

    if (userId != req.user.sub) {
        return res.status(401).send({message: 'No tiene permiso para realizar esta acción '});
    }else{
        categoryModel.findById(categoryId,(err,categoryFind)=>{
            if (err) {
                return res.status(500).send({message: 'Error General',err});
            }else if(categoryFind) {
                userModel.findOne({_id: userId, category: categoryId},(err, userFind)=>{
                    if (err) {
                        return res.status(500).send({message: 'Error General',err});
                    }else if(userFind) {
                        categoryModel.findOne({nameCategory: params.nameCategory.toLowerCase()},(err,categoryDetect)=>{
                            params.nameCategory = params.nameCategory.toLowerCase();
                            if (err) {
                                return res.status(500).send({message: 'Error General',err});
                            }else if(categoryDetect) {
                                if (categoryDetect._id == categoryId) {
                                    categoryModel.findByIdAndUpdate(categoryId, params, {new: true},(err,categoryUpdate)=>{
                                        if (err) {
                                            return res.status(500).send({message: 'Error General',err});
                                        }else if(categoryUpdate) {
                                            return res.send({ message: 'Categoria Actualizado Correctamente', categoryUpdate });
                                        } else {
                                            return res.send({ message: 'No se pudo actualizar la Categoria' });
                                        }
                                    });
                                } else {
                                    return res.status(404).send({message: 'Nombre De Categoria ya existente'});
                                }
                                
                            } else {
                                params.nameCategory = params.nameCategory.toLowerCase();
                                categoryModel.findByIdAndUpdate(categoryId, params, {new: true},(err,categoryUpdate)=>{
                                    if (err) {
                                        return res.status(500).send({message: 'Error General',err});
                                    }else if(categoryUpdate) {
                                        return res.send({ message: 'Categoria Actualizado Correctamente', categoryUpdate });
                                    } else {
                                        return res.send({ message: 'No se pudo actualizar la Categoria' });
                                    }
                                });
                            }
                        });
                    } else {
                        return res.send({ message: 'No tienes Permiso' });
                    }
                });
            } else {
                return res.send({ message: 'No existe Categoria' });
            }
        });
    }
   
    
}

/* Delete Category*/
function deleteCategory(req,res) {
    let userId = req.params.userId;
    let categoryId = req.params.categoryId;
    let payload  = req.user;

    if (userId != req.user.sub) {
        return res.status(401).send({message: 'No tiene permiso para realizar esta acción '});
    }else{
        userModel.findOne({_id: userId},(err,userFind)=>{
            if (err) {
                return res.status(500).send({message: 'Error General',err});
            }else if(userFind) {
                userModel.findByIdAndUpdate({_id: userId, category: categoryId},
                    {$pull: {category: categoryId}},{new: true},(err,categoryPull)=>{
                        if (err) {
                            return res.status(500).send({message: 'Error General',err});
                        }else if(categoryPull) {
                            categoryModel.findOne({_id: categoryId},(err, categoryFind)=>{
                                if (err) {
                                    return res.status(500).send({message: 'Error General',err});
                                }else if(categoryFind) {
                                    categoryModel.findByIdAndRemove(categoryId,(err,categoryRemove)=>{
                                        if (err) {
                                            return res.status(500).send({message: 'Error General',err});
                                        }else if(categoryRemove) {
                                            return res.send({message: 'Categoria Eliminada Correctamente',categoryRemove});
                                        } else {
                                            return res.status(404).send({message: 'No se puedo Eliminar Categoria'});
                                        }
                                    });        
                                } else {
                                    return res.status(403).send({message: 'Categoria no encontrada'});
                                }
                            });
    
                        } else {
                            return res.status(403).send({ message: 'No se pudo Eliminar' });
                        }
                });
            } else {
                return res.status(401).send({message: 'usuario no encontrado'});
            }
        });
    }

}


/* get Category*/
function getCategory(req,res) {
    categoryModel.find({}).exec((err,categorys)=>{
        if (err) {
            return res.status(500).send({message: 'Error General',err});
        }else if(categorys) {
            return res.send({message: 'Categorias',categorys});
        } else {
            return res.status(401).send({message: 'No Hay Categorias'});
        }
    });
}

/* get Category por Id*/
function getCategoryId(req,res) {
    let userId = req.params.userId;
    let categoryId = req.params.categoryId;

    if (userId != req.user.sub) {
        return res.status(401).send({message: 'No tiene permiso para realizar esta acción '});
    }else{
        categoryModel.findOne({_id: categoryId}).exec((err, Category) => {
            if (err) {
                return res.status(500).send({ message: 'Error general en el servidor' })
            } else if (Category) {
                return res.send({ message: 'Categoria',Category })
            } else {
                return res.status(404).send({ message: 'No hay Categoria' })
            }
        });
    }
    
}


/* Export */

module.exports = {
    saveCategory,
    deleteCategory,
    updateCategory,
    getCategory,
    getCategoryId
}