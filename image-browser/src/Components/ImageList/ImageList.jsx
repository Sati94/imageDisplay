import React, { useState } from "react";
import "./ImageList.css"
import data from "../Asserts/data.json"
import img from "../Asserts/Images/img.png"
import { Link } from 'react-router-dom'


const ImageList = () => {
    /* itt lehet egy API lekérés 
    const [data, setData] = useState([]);
    
    useEffect(() => {
            async function fetchProducts() {
                try {
                    const response = await fetch(`${API_BASE_URL}/something`);
                    const data = await response.json();
                    setData(data);
    
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            }
    
            fetchProducts();
        }, []);
    */
    const [filter, setFilter] = useState({
        category: "search",
        query: ""
    })
    const handleCategoryChange = (category) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            category: category
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value

        }))
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // A toLocaleDateString() metódus az aktuális locale alapján formázza a dátumot
    };



    const filteredImages = data.response.docs.filter((image) => {
        switch (filter.category) {
            case "prefix":
                return image.prefix_str.some(prefix => prefix.toLowerCase().includes(filter.query.toLowerCase()));
            case "type":
                return image.pictureType_str.some(type => type.toLowerCase().includes(filter.query.toLowerCase()));
            case "format":
                return image.format_str.some(format => format.toLowerCase().includes(filter.query.toLowerCase()));
            case "date":
                return new Date(image.createDate_dt).toLocaleDateString() === new Date(filter.query).toLocaleDateString();
            default:
                return image.description_str[0].toLowerCase().includes(filter.query.toLowerCase());
        }
    })

    return (
        <div>
            <div className="search-container">
                <div className="button-group">
                    <button
                        className={filter.category === "search" ? "active" : ""}
                        onClick={() => handleCategoryChange("search")}
                    >
                        Search
                    </button>
                    <button
                        className={filter.category === "prefix" ? "active" : ""}
                        onClick={() => handleCategoryChange("prefix")}
                    >
                        Prefix
                    </button>
                    <button
                        className={filter.category === "type" ? "active" : ""}
                        onClick={() => handleCategoryChange("type")}
                    >
                        Type
                    </button>
                    <button
                        className={filter.category === "format" ? "active" : ""}
                        onClick={() => handleCategoryChange("format")}
                    >
                        Format
                    </button>
                    <button
                        className={filter.category === "date" ? "active" : ""}
                        onClick={() => handleCategoryChange("date")}
                    >
                        Date
                    </button>
                </div>
                <input
                    type={filter.category === "date" ? "date" : "text"}
                    name="query"
                    placeholder={filter.category.charAt(0).toUpperCase() + filter.category.slice(1)}
                    value={filter.query}
                    onChange={handleInputChange}
                />
            </div>
            {filteredImages.length > 0 ? (
                <div className="card-container">
                    {filteredImages.map((image) => (
                        <div className="card" key={image.id}>
                            <div className="card-image-container">
                                <Link to={`/image/${image.id}`}>
                                    <img
                                        src={img}
                                        alt={image.description_str}
                                        className="card-image"
                                    />
                                </Link>
                            </div>
                            <div className="card-content">
                                <h3>{image.description_str}</h3>
                                <p><strong>ID:</strong> {image.id}</p>
                                <p><strong>Size:</strong> {`${image.ow_i}x${image.oh_i}`}</p>
                                <p><strong>Creation Date:</strong> {formatDate(image.createDate_dt)}</p>
                                <p><strong>Modification Date:</strong> {formatDate(image.harvestDate_dt)}</p>
                                <p><strong>Format:</strong> {image.format_str}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-data-message">Nincs adat</div>
            )}
        </div >
    );
}

export default ImageList;
