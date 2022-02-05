const path = require('path');
const fs = require('fs');

const fileRenamer = (filename) => {
    const queHoraEs = Date.now();
    const regex = /[\s_-]/gi;
    const fileTemp = filename.replace(regex, ".");
    let arrTemp = [fileTemp.split(".")];
    return `${arrTemp[0].slice(0, arrTemp[0].length - 1).join("_")}${queHoraEs}.${arrTemp[0].pop()}`;
};

module.exports = {
    uploadSingleFile: async (file) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const { finished } = require('stream/promises');
        const stream = createReadStream();
        const out = require('fs').createWriteStream('upload/'+filename);
        stream.pipe(out);
        await finished(out);

        return { filename, mimetype, encoding };
    },

    uploadManyFiles: async (file) => {
        let url = [];
        for (let i = 0; i < file.length; i++) {
            const { createReadStream, filename, mimetype } = await file[i];
            const stream = createReadStream();
            const assetUniqName = fileRenamer(filename);
            const pathName = path.join(__dirname,  `../upload/${assetUniqName}`);
            await stream.pipe(fs.createWriteStream(pathName));
            const urlForArray = `http://localhost:4000/${assetUniqName}`;
            url.push({ url: urlForArray });
        }

        return url;
    }

}