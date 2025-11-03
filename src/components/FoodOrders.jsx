const toBase64 = (file) => {
    return new Promise ((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
    })
}

const base64Orders = async (files) => {
    console.log('food')
    console.log(files)

    return await Promise.all(
        files.map(async (file) => {
            if (!file) return null; // skip invalid file

            const base64 = await toBase64(file);
            if (!base64) return null; // just in case
            const parts = base64.split(",");

            return {
                fileName: file.name,
                fileType: file.type,
                fileContent: parts[1], // actual file content
            };
        })
    )
}
//MAKE MAX SIZE 5MB AND 10 PICTURES AND SHOW LOADING
//DISABLE SUBMIT BUTTON WHEN STILL UPLOADING IMAGES
//MAKE IMAGES PERSISTENT
export default base64Orders