import React from "react";
import "./ImageList.css"
import data from "../Asserts/data.json"
import img from "../Asserts/Images/img.png"



const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // A toLocaleDateString() metódus az aktuális locale alapján formázza a dátumot
};


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
    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-thead">
                    <tr className="table-tr">
                        <th>IMG</th>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Size</th>
                        <th>CDate</th>
                        <th>MDate</th>
                        <th>Format</th>
                    </tr>
                </thead>
                <tbody className="table-tbody">
                    {data.response.docs.map(image => (
                        <tr key={image.id}>
                            <td><img src={img} alt={image.description_str} /></td>
                            <td>{image.id}</td>
                            <td>{image.description_str}</td>
                            <td>{`${image.ow_i}x${image.oh_i}`}</td>
                            <td>{formatDate(image.createDate_dt)}</td>
                            <td>{formatDate(image.harvestDate_dt)}</td>
                            <td>{image.format_str}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ImageList;
