import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PatientStyle/Documents.css";
import { Link } from "react-router-dom";

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);


    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get_documents`);
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchDocuments();
    }, []);

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("File uploaded successfully!");
            setDocuments([...documents, response.data]);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    const handleDelete = async (fileName) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/documents/${fileName}`);
            alert("File deleted successfully!");
            setDocuments(documents.filter((doc) => doc.DocName !== fileName));
        } catch (error) {
            console.error("Error deleting file:", error);
            alert("Failed to delete file.");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="docContainer">
            <h1 className="head">My Documents</h1>
            <div className="docList">
                {documents.map((doc, index) => (
                    <div key={index} className="eachDocContainer">
                        <div className="eachDoc">
                            <h4>{doc.DocName}</h4>
                            <p>{doc.DocDate}</p>
                        </div>
                        <button
                            className="ViewBtn"
                            onClick={() => window.open(doc.DocUrl, "_blank")}
                        >
                           <Link to="/download/:fileName">View</Link></button>
                        <button className="delBtn" onClick={() => handleDelete(doc.DocName)}>
                            &#xf5de;
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h6>Upload Your File</h6>
                <form onSubmit={handleFileUpload}>
                    <input type="file" id="fileUpload" name="fileUpload" onChange={handleFileChange}></input>
                    <input type="submit" value="Upload"></input>
                </form>
            </div>
        </div>
    );
};

export default Documents;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/PatientStyle/Documents.css";
// import { Link } from "react-router-dom";

// const Documents = () => {
//     const [documents, setDocuments] = useState([]);
//     const [file, setFile] = useState(null);
//     const [editIndex, setEditIndex] = useState(null); // Track the index of the document being edited
//     const [newDocName, setNewDocName] = useState(""); // Hold the new document name

//     useEffect(() => {
//         const fetchDocuments = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/v1/get_documents`);
//                 setDocuments(response.data);
//             } catch (error) {
//                 console.error("Error fetching documents:", error);
//             }
//         };

//         fetchDocuments();
//     }, []);

//     const handleFileUpload = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             alert("Please select a file to upload.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await axios.post("http://localhost:5000/api/v1/documents/upload", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             alert("File uploaded successfully!");
//             setDocuments([...documents, response.data]);
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             alert("Failed to upload file.");
//         }
//     };

//     const handleDelete = async (fileName) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/v1/documents/${fileName}`);
//             alert("File deleted successfully!");
//             setDocuments(documents.filter((doc) => doc.DocName !== fileName));
//         } catch (error) {
//             console.error("Error deleting file:", error);
//             alert("Failed to delete file.");
//         }
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleEditClick = (index, currentName) => {
//         setEditIndex(index); // Set the document being edited
//         setNewDocName(currentName); // Pre-fill the input with the current name
//     };

//     const handleUpdate = async (fileName) => {
//         try {
//             const response = await axios.put(`http://localhost:5000/api/v1/documents/update`, {
//                 oldName: fileName,
//                 newName: newDocName,
//             });
//             alert("Document name updated successfully!");

//             // Update the document name in the state
//             const updatedDocuments = documents.map((doc) =>
//                 doc.DocName === fileName ? { ...doc, DocName: newDocName } : doc
//             );
//             setDocuments(updatedDocuments);

//             // Reset the editing state
//             setEditIndex(null);
//             setNewDocName("");
//         } catch (error) {
//             console.error("Error updating document name:", error);
//             alert("Failed to update document name.");
//         }
//     };

//     return (
//         <div className="docContainer">
//             <h1 className="head">My Documents</h1>
//             <div className="docList">
//                 {documents.map((doc, index) => (
//                     <div key={index} className="eachDocContainer">
//                         <div className="eachDoc">
//                             {/* Check if this document is being edited */}
//                             {editIndex === index ? (
//                                 <input
//                                     type="text"
//                                     value={newDocName}
//                                     onChange={(e) => setNewDocName(e.target.value)}
//                                     placeholder="Enter new document name"
//                                 />
//                             ) : (
//                                 <>
//                                     <h4>{doc.DocName}</h4>
//                                     <p>{doc.DocDate}</p>
//                                 </>
//                             )}
//                         </div>
//                         <button
//                             className="ViewBtn"
//                             onClick={() => window.open(doc.DocUrl, "_blank")}
//                         >
//                             <Link to={`/download/${doc.DocName}`}>View</Link>
//                         </button>
//                         <button className="delBtn" onClick={() => handleDelete(doc.DocName)}>
//                             &#xf5de;
//                         </button>
//                         {/* Add an Edit button */}
//                         {editIndex === index ? (
//                             <button
//                                 className="saveBtn"
//                                 onClick={() => handleUpdate(doc.DocName)}
//                             >
//                                 Save
//                             </button>
//                         ) : (
//                             <button
//                                 className="editBtn"
//                                 onClick={() => handleEditClick(index, doc.DocName)}
//                             >
//                                 Edit
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h6>Upload Your File</h6>
//                 <form onSubmit={handleFileUpload}>
//                     <input type="file" id="fileUpload" name="fileUpload" onChange={handleFileChange}></input>
//                     <input type="submit" value="Upload"></input>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Documents;
