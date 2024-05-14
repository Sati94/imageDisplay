import React from 'react'
import "./ImageDetails.css"
import img from "../Asserts/Images/img.png"
import data from "../Asserts/data.json"
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'



const ImageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const image = data.response.docs.find((img) => img.id === id);

    const [formData, setFormData] = useState({
        country: image ? image.country : '',
        date: image ? new Date(image.createDate_dt).toLocaleDateString() : '',
        shortTitle: image ? image.shortTitle || '' : '',
        city: image ? image.city || '' : '',
        imageText: image ? image.imageText || '' : '',
        backgroundInfo: image ? image.backgroundInfo || '' : ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    if (!image) {
        return <div>Image not found</div>;
    }

    const handleBack = () => {
        navigate('/');
    };

    const handleSave = async () => {
        try {
            const response = await fetch('API__SAVE_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: image.id,
                    ...formData
                })
            });
            if (!response.ok) {
                throw new Error('Error saving data');
            }
            alert('Data saved successfully');
        }
        catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data');
        }
    }
    const handleDelete = async () => {
        try {
            const response = await fetch(`API_DELETE_ENDPOINT/${image.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error deleting data');
            }
            alert('Image deleted successfully');
            setTimeout(() => {
                navigate('/');
            }, 2000); //Visszavisz a '/' oldalra 2 másodperc múlva
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('Failed to delete data');
        }
    };

    return (
        <div className="image-detail">
            <button onClick={handleBack} className="back-button">Back to List</button>
            <h2>{image.description_str}</h2>
            <img src={img} alt={image.description_str} className="large-image" />
            <div className="meta-data">
                <h2>Metaadatok:</h2>
                <p><strong>Azonosító:</strong> {image.id}</p>
                <p><strong>Filenév:</strong> {image.filename_str[0]}</p>
                <p><strong>Gyűjtemény:</strong> {image.coll_str[0]}</p>
                <p><strong>Riport:</strong> {image.serialinfo_str[0]}</p>
                <p><strong>Technikai infó:</strong> {image.bitdepth_i}-bit</p>
                <p><strong>Eredeti képszám:</strong> {image.mid_str[0]}</p>
                <p><strong>Master format:</strong> {image.format_str[0]}</p>
                <p><strong>MetaDataSet:</strong> {image.prefix_str[0]}</p>
                <p><strong>Kiadás dátuma:</strong> {new Date(image.createDate_dt).toLocaleDateString()}</p>
                <p><strong>Utolsó módosítás:</strong> {new Date(image.harvestDate_dt).toLocaleDateString()}</p>
            </div>
            <div className="public-data">
                <h2>Publikus adatok:</h2>
                <label><strong>Rövidített cím:</strong>
                    <input
                        type="text"
                        name="shortTitle"
                        value={formData.shortTitle}
                        onChange={handleInputChange}
                    />
                </label>
                <label><strong>Készítés dátuma:</strong>
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                </label>
                <label><storng>Ország:</storng>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                </label>
                <label><strong>Város:</strong>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                </label>
                <label><strong>Képszöveg:</strong>
                    <textarea
                        name="imageText"
                        value={formData.imageText}
                        onChange={handleInputChange}
                    />
                </label>
                <label><strong>Háttérinfó:</strong>
                    <input
                        type="text"
                        name="backgroundInfo"
                        value={formData.backgroundInfo}
                        onChange={handleInputChange}
                    />
                </label>
                <button onClick={handleSave} className="save-button">Mentés</button>
                <button onClick={handleDelete} className="delete-button">Törlés</button>
            </div>
        </div>
    );
};



export default ImageDetails