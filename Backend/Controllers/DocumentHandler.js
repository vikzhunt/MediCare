const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

cloudinary.config({
    cloud_name: 'drh73kwiz', 
    api_key: '623384858527233',      
    api_secret: 'df042eBGFRK5R-M_hHmOj-Pbtz8', 
});

const Document = require('../Models/Documents'); 
const uploadDocument = async (req, res) => {
    try {
        const file = req.file; 
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

       
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'documents',
            resource_type: 'raw',
        });


        const newDocument = new Document({
            DocName: path.basename(result.public_id),
            DocUrl: result.secure_url,
            DocDate: new Date(),
        });

        await newDocument.save();

        fs.unlinkSync(file.path);

        res.status(201).json({
            message: 'File uploaded successfully',
            document: newDocument,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to upload file', error });
    }
};


const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find(); 
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Failed to fetch documents', error });
    }
};

const deleteDocument = async (req, res) => {
    const { fileName } = req.params;

    try {
        const document = await Document.findOne({ DocName: fileName });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        await cloudinary.uploader.destroy(`documents/${fileName}`);

        await Document.deleteOne({ DocName: fileName });

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Failed to delete file', error });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    deleteDocument,
};
