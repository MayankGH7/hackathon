import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Bell, AlertTriangle, DollarSign, Calendar } from 'lucide-react';

const NotificationsPanel = ({ onClose }) => {
  const { notifications, markNotificationAsRead } = useFinance();

  const getIcon = (type) => {
    switch (type) {
      case 'bill':
        return <Calendar className="text-blue-500" size={20} />;
      case 'budget':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'transaction':
        return <DollarSign className="text-green-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  const handleNotificationClick = (id) => {
    markNotificationAsRead(id);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                notification.read ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  {getIcon(notification.type)}
                </div>
                <div>
                  <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.read ? 'Read' : 'New'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel; 