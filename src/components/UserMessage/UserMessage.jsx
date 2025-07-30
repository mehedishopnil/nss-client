import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { FaCheckCircle, FaClock, FaEnvelopeOpenText } from 'react-icons/fa';

const statusColors = {
  new: 'badge-primary',
  responded: 'badge-success',
  pending: 'badge-warning',
  closed: 'badge-neutral',
};

const UserMessage = () => {
  const { userMessages } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Your Messages to Admin
      </h2>

      {userMessages?.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <FaEnvelopeOpenText className="text-5xl mx-auto mb-4" />
          <p>You haven’t sent any messages to admin yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {userMessages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-800">
                  Message ID: <span className="text-sm text-gray-500">{msg._id.slice(-6)}</span>
                </h4>
                <div
                  className={`badge ${statusColors[msg.status] || 'badge-info'} text-white text-xs py-1 px-3`}
                >
                  {msg.status.toUpperCase()}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{msg.message}</p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaClock />
                  <span>
                    Sent: {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {msg.isRead ? (
                    <>
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-green-600 font-medium">Read by Admin</span>
                    </>
                  ) : (
                    <>
                      <FaEnvelopeOpenText className="text-red-400" />
                      <span className="text-red-500 font-medium">Unread by Admin</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMessage;
