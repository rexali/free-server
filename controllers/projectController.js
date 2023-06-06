const { htmlEscape } = require("../utils/escapeHelper");
const projectModel = require("../models/projectModel");
const fileController = require("./fileController")

class Project {

  constructor(data) {
    this.data = data
  }

  treatData() {
    const treatedData = {
      id: htmlEscape(this.data.id),
      title: htmlEscape(this.data.title),
      category: htmlEscape(this.data.category),
      budget: htmlEscape(this.data.budget),
      description: htmlEscape(this.data.description),
      image: htmlEscape(this.data.image)
    }

    return treatedData;
  }

  uploadImage() {

    return fileController.uploadSingleFile(this.data.image)
  }
  
}


module.exports = {
  createProject: async (data) => {

    const treatedData = {
      id: htmlEscape(data.id),
      title: htmlEscape(data.title),
      category: htmlEscape(data.category),
      budget: htmlEscape(data.budget),
      description: htmlEscape(data.description),
      image: htmlEscape(data.image)
    }

    const result;

    try {
      result = await projectModel.createProject(data);
      if (result) {
        await fileController.uploadSingleFile(this.data.image)
      }
    } catch (error) {
      console.warn(error)
    }

    return result;
  },

  readPojects: () => {
    const result;
    try {
      result = await projectModel.readProjects();
    } catch (error) {
      console.warn(error)
    }
    return result;
  },

  updateProject: (data) => {

    const treatedData = {
      id: htmlEscape(data.id),
      title: htmlEscape(data.title),
      category: htmlEscape(data.category),
      budget: htmlEscape(data.budget),
      description: htmlEscape(data.description),
      image: htmlEscape(data.image)
    }

    const result;

    try {
      result = await projectModel.updateProject(treatedData);
    } catch (error) {
      console.warn(error)
    }

    return result;
  },

  deleteProject: (id) => {

    const newId = htmlEscape(data.id);
    const result;
    try {
      result = await projectModel.deleteProject(newId);
    } catch (error) {
      console.warn(error)
    }

    return result;
  }

}