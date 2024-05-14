import React from 'react'
import "./ImageDetails.css"
import img from "../Asserts/Images/img.png"
import data from "../Asserts/data.json"
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'



const ImageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const image = data.response.docs.find((img) => img.id === id);
    if (!image) {
        return <div>Image not found</div>;
    }

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="image-detail">
            <button onClick={handleBack} className="back-button">Back to List</button>
            <h2>{image.description_str}</h2>
            <img src={img} alt={image.description_str} className="large-image" />
            <div className="meta-data">
                <h3>Metaadatok</h3>
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
                <h3>Publikus adatok</h3>
                <textarea defaultValue={image.description_str} />
                <button className="save-button">Mentés</button>
                <button className="delete-button">Törlés</button>
            </div>
        </div>
    );
};



export default ImageDetails