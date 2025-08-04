import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GuardsInputForm = () => {
    const { createGuard } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        nid: '',
        address: '',
        joinDate: '',
        dutyPlace: '',
        dutyTime: '08:00 AM - 05:00 PM' // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Basic validation
        if (!formData.name || !formData.phone || !formData.nid || !formData.dutyPlace || !formData.dutyTime) {
            toast.error('Please fill all required fields');
            setIsSubmitting(false);
            return;
        }

        try {
            // Format the data for API
            const guardData = {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                nid: formData.nid.trim(),
                address: formData.address.trim(),
                joinDate: formData.joinDate || new Date().toISOString(),
                dutyPlace: formData.dutyPlace.trim(),
                dutyTime: formData.dutyTime.trim()
            };

            const result = await createGuard(guardData);
            toast.success('Guard added successfully!');
            navigate(`/admin-panel/single-guard/${result._id}`);
        } catch (error) {
            console.error('Error creating guard:', error);
            toast.error(error.message || 'Failed to add guard');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h1 className="text-2xl font-bold mb-6">Add New Guard</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Personal Information Section */}
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold border-b pb-2">Personal Information</h2>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name <span className="text-error">*</span></span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Abdul Karim"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number <span className="text-error">*</span></span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="01712345678"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">NID Number <span className="text-error">*</span></span>
                                </label>
                                <input
                                    type="text"
                                    name="nid"
                                    value={formData.nid}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="1987654321098"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Mirpur, Dhaka"
                                />
                            </div>
                        </div>

                        {/* Employment Information Section */}
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold border-b pb-2">Employment Information</h2>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Join Date</span>
                                </label>
                                <input
                                    type="date"
                                    name="joinDate"
                                    value={formData.joinDate}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Duty Place <span className="text-error">*</span></span>
                                </label>
                                <input
                                    type="text"
                                    name="dutyPlace"
                                    value={formData.dutyPlace}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="City Center, Gulshan"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Duty Time <span className="text-error">*</span></span>
                                </label>
                                <select
                                    name="dutyTime"
                                    value={formData.dutyTime}
                                    onChange={handleChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="08:00 AM - 05:00 PM">Day Shift (8AM-5PM)</option>
                                    <option value="05:00 PM - 02:00 AM">Evening Shift (5PM-2AM)</option>
                                    <option value="10:00 PM - 06:00 AM">Night Shift (10PM-6AM)</option>
                                    <option value="custom">Custom Time</option>
                                </select>
                            </div>

                            {formData.dutyTime === 'custom' && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Custom Duty Time <span className="text-error">*</span></span>
                                    </label>
                                    <input
                                        type="text"
                                        name="dutyTime"
                                        value={formData.dutyTime}
                                        onChange={handleChange}
                                        className="input input-bordered"
                                        placeholder="e.g., 08:00 AM - 08:00 PM"
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin-panel/guards')}
                                className="btn btn-outline"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Adding...
                                    </>
                                ) : (
                                    'Add Guard'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GuardsInputForm;