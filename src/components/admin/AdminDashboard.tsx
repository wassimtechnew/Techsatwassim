import { useState } from 'react';
import { 
  LogOut, 
  Edit3, 
  Check, 
  X, 
  Tv, 
  Monitor, 
  Download,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface AdminDashboardProps {
  language: 'ar' | 'fr';
  setLanguage: (lang: 'ar' | 'fr') => void;
}

export default function AdminDashboard({ language, setLanguage }: AdminDashboardProps) {
  const { 
    iptvOffers, 
    androidBoxes, 
    logout, 
    updateIPTVOffer, 
    addIPTVOffer, 
    deleteIPTVOffer,
    updateAndroidBox,
    addAndroidBox,
    deleteAndroidBox,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'iptv' | 'android'>('iptv');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: 'saving' | 'success' | 'error' }>({});

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    download_url: '',
    app_name: '',
    purchase_url: '',
    specifications: '',
    is_available: true
  });

  const handleEdit = (id: string, item: any) => {
    setEditingId(id);
    setFormData({
      name: item.name || '',
      price: item.price || '',
      description: item.description || '',
      image_url: item.image_url || '',
      download_url: item.download_url || '',
      app_name: item.app_name || '',
      purchase_url: item.purchase_url || '',
      specifications: item.specifications || '',
      is_available: item.is_available !== undefined ? item.is_available : true
    });
  };

  const handleSave = async (id: string) => {
    try {
      setSaveStatus({ ...saveStatus, [id]: 'saving' });
      
      if (activeTab === 'iptv') {
        await updateIPTVOffer(id, {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          image_url: formData.image_url,
          download_url: formData.download_url,
          app_name: formData.app_name
        });
      } else {
        await updateAndroidBox(id, {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          image_url: formData.image_url,
          purchase_url: formData.purchase_url,
          specifications: formData.specifications,
          is_available: formData.is_available
        });
      }
      
      setSaveStatus({ ...saveStatus, [id]: 'success' });
      setEditingId(null);
      resetForm();
      
      setTimeout(() => {
        setSaveStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[id];
          return newStatus;
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error saving item:', error);
      setSaveStatus({ ...saveStatus, [id]: 'error' });
      
      setTimeout(() => {
        setSaveStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[id];
          return newStatus;
        });
      }, 3000);
    }
  };

  const handleAdd = async () => {
    try {
      if (activeTab === 'iptv') {
        await addIPTVOffer({
          name: formData.name,
          price: formData.price,
          description: formData.description,
          image_url: formData.image_url || 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400',
          download_url: formData.download_url,
          app_name: formData.app_name || formData.name
        });
      } else {
        await addAndroidBox({
          name: formData.name,
          price: formData.price,
          description: formData.description,
          image_url: formData.image_url || 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400',
          purchase_url: formData.purchase_url,
          specifications: formData.specifications,
          is_available: formData.is_available
        });
      }
      
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (activeTab === 'iptv') {
          await deleteIPTVOffer(id);
        } else {
          await deleteAndroidBox(id);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      image_url: '',
      download_url: '',
      app_name: '',
      purchase_url: '',
      specifications: '',
      is_available: true
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredItems = activeTab === 'iptv' 
    ? iptvOffers.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : androidBoxes.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const stats = {
    totalIptv: iptvOffers.length,
    totalAndroid: androidBoxes.length,
    iptvWithLinks: iptvOffers.filter(s => s.download_url).length,
    androidAvailable: androidBoxes.filter(s => s.is_available).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://i.postimg.cc/NF779kPx/image.png" 
                alt="TechnSat Logo" 
                className="h-8 w-8 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">TechnSat chez Wassim</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'fr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'ar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  AR
                </button>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <Tv className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">IPTV Services</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalIptv}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Monitor className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Android Boxes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAndroid}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">IPTV with Links</p>
                <p className="text-2xl font-bold text-gray-900">{stats.iptvWithLinks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Available Boxes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.androidAvailable}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('iptv')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'iptv'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Tv className="h-4 w-4 inline mr-2" />
                IPTV Services
              </button>
              <button
                onClick={() => setActiveTab('android')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'android'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Monitor className="h-4 w-4 inline mr-2" />
                Android Boxes
              </button>
            </nav>
          </div>

          {/* Controls */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New {activeTab === 'iptv' ? 'IPTV Service' : 'Android Box'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 25 TND/month"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {activeTab === 'iptv' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Download URL</label>
                    <input
                      type="url"
                      value={formData.download_url}
                      onChange={(e) => handleInputChange('download_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                    <input
                      type="text"
                      value={formData.app_name}
                      onChange={(e) => handleInputChange('app_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purchase URL</label>
                    <input
                      type="url"
                      value={formData.purchase_url}
                      onChange={(e) => handleInputChange('purchase_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
                    <input
                      type="text"
                      value={formData.specifications}
                      onChange={(e) => handleInputChange('specifications', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., 4K, 8GB RAM, Android 11"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_available"
                      checked={formData.is_available}
                      onChange={(e) => handleInputChange('is_available', e.target.checked)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_available" className="ml-2 block text-sm text-gray-900">
                      Available for purchase
                    </label>
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleAdd}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Check className="h-4 w-4" />
                <span>Add</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'iptv' ? 'Download URL' : 'Purchase URL'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const status = saveStatus[item.id];
                  const isEditing = editingId === item.id;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Name"
                            />
                            <textarea
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Description"
                            />
                            <input
                              type="url"
                              value={formData.image_url}
                              onChange={(e) => handleInputChange('image_url', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Image URL"
                            />
                            {activeTab === 'android' && (
                              <>
                                <input
                                  type="text"
                                  value={formData.specifications}
                                  onChange={(e) => handleInputChange('specifications', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                  placeholder="Specifications"
                                />
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`available-${item.id}`}
                                    checked={formData.is_available}
                                    onChange={(e) => handleInputChange('is_available', e.target.checked)}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                  />
                                  <label htmlFor={`available-${item.id}`} className="ml-2 block text-sm text-gray-900">
                                    Available
                                  </label>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <img 
                              src={item.image_url} 
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover mr-3"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = activeTab === 'iptv' 
                                  ? 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400'
                                  : 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400';
                              }}
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              {item.description && (
                                <div className="text-sm text-gray-500 max-w-xs truncate">{item.description}</div>
                              )}
                              <div className="text-xs text-gray-400">ID: {item.id}</div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Price"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-900">{item.price || 'Not set'}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="url"
                            value={activeTab === 'iptv' ? formData.download_url : formData.purchase_url}
                            onChange={(e) => handleInputChange(activeTab === 'iptv' ? 'download_url' : 'purchase_url', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder={activeTab === 'iptv' ? 'Download URL' : 'Purchase URL'}
                          />
                        ) : (
                          <div className="max-w-xs">
                            {(activeTab === 'iptv' ? (item as any).download_url : (item as any).purchase_url) ? (
                              <a
                                href={activeTab === 'iptv' ? (item as any).download_url : (item as any).purchase_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm truncate block"
                              >
                                {activeTab === 'iptv' ? (item as any).download_url : (item as any).purchase_url}
                              </a>
                            ) : (
                              <span className="text-gray-400 text-sm">No URL set</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {status === 'saving' && (
                          <div className="flex items-center text-yellow-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                            <span className="text-xs">Saving...</span>
                          </div>
                        )}
                        {status === 'success' && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="text-xs">Saved!</span>
                          </div>
                        )}
                        {status === 'error' && (
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <span className="text-xs">Error</span>
                          </div>
                        )}
                        {!status && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="text-xs">
                              {activeTab === 'android' && !(item as any).is_available ? 'Unavailable' : 'Active'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {isEditing ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSave(item.id)}
                              disabled={status === 'saving'}
                              className="text-green-600 hover:text-green-900 flex items-center space-x-1 disabled:opacity-50"
                            >
                              <Check className="h-4 w-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancel}
                              disabled={status === 'saving'}
                              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 disabled:opacity-50"
                            >
                              <X className="h-4 w-4" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item.id, item)}
                              className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                            >
                              <Edit3 className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}