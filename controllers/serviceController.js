const serviceModel = require("../models/serviceModel");

module.exports={
    
    serviceByCategory: async () => {
        let sectiondata = [];
        const data = await serviceModel.getManyServices();
        let category = Array.from(new Set(data.map((item) => item.category)));
        category.forEach((item) => {
            sectiondata.push({
                title: item,
                data: [...data.filter(service => service.category === item)], //.slice(0, 2)
            }
            );
        });

        return sectiondata;
    }

}