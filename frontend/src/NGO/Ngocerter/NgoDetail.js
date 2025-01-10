import React, { useEffect, useState } from 'react';
import { getNGOById } from '../Service/ngoService'; // Make sure to import your API function

const NGODetail = ({ id }) => {
  const [ngoData, setNgoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNGOData = async () => {
      try {
        const data = await getNGOById(id);
        setNgoData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchNGOData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ngoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ngo-detail">
      <h2>{ngoData.name}</h2>
      <img src={ngoData.logoUrl} alt={ngoData.name} />
      <p><strong>Description:</strong> {ngoData.description}</p>
      <p><strong>Code:</strong> {ngoData.code}</p>
      <p><strong>Email:</strong> {ngoData.email}</p>
      <p><strong>Achievements:</strong> {ngoData.achievements}</p>
      <p><strong>Approved:</strong> {ngoData.isApproved ? 'Yes' : 'No'}</p>
      <p><strong>Created At:</strong> {new Date(ngoData.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(ngoData.updatedAt).toLocaleString()}</p>
      {/* Display other data as needed */}
    </div>
  );
};

export default NGODetail;
