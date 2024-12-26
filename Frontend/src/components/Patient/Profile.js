import "../../styles/PatientStyle/Profile.css";
import profilePic from "../../images/photograph.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = (props) => {
  const email = localStorage.getItem('email');

  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/getUser/${email}`);
        setUser(response.data.user);
      } catch (e) {
        console.error("Error fetching user:", e);
      }
    };

    fetchUser();
  }, [email]);

  const handleEditClick = () => {
    setFormData(user); 
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/api/v1/updateUser/${email}`, formData);
      setUser(response.data.updatedUser); 
      setIsModalOpen(false); 
      console.log("User updated successfully:", response.data.updatedUser);
    } 
    catch (e) {
      console.error("Error updating user:", e);
    }
  };
  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patProfileContainer">
      <div className="patProfielTab">
        <div className="patcontent">
          <h2>{user.username}</h2>
          <h5>Age: {user.age}</h5>
          <h5>Gender: {user.gender}</h5>
          <h5>Blood Group: {user.bloodGroup}</h5>
        </div>

        <div>
          <img className="patProfilePic" src={profilePic} alt="Profile" />
        </div>
      </div>
      <button className="patEditBtn" onClick={handleEditClick}>Edit </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>Edit Profile</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="username"
                value={formData.username || ""}
                onChange={handleFormChange}
                placeholder="Username"
                required
              />
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo || ""}
                onChange={handleFormChange}
                placeholder="Contact No"
                required
              />
              <input
                type="number"
                name="age"
                value={formData.age || ""}
                onChange={handleFormChange}
                placeholder="Age"
                required
              />
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup || ""}
                onChange={handleFormChange}
                placeholder="Blood Group"
                required
              />
              {user.role === "doctor" && (
                <>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization || ""}
                    onChange={handleFormChange}
                    placeholder="Specialization"
                  />
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee || ""}
                    onChange={handleFormChange}
                    placeholder="Consultation Fee"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleFormChange}
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability || ""}
                    onChange={handleFormChange}
                    placeholder="Availability"
                  />
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience || ""}
                    onChange={handleFormChange}
                    placeholder="Experience"
                  />
                </>
              )}
              <button type="submit" className="saveBtn">Save</button>
              <button type="button" className="cancelBtn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
