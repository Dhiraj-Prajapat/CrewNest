
// import React, { useState } from 'react';
// import { X, Palette, Sun, Moon } from 'lucide-react';

// const SettingsModal = ({ isOpen, onClose }) => {
//   const [activeTheme, setActiveTheme] = useState('system');

//   if (!isOpen) return null;

//   const themeOptions = [
//     {
//       id: 'light',
//       name: 'Light',
//       icon: Sun,
//       description: 'Light theme for daytime use',
//       preview: 'bg-white text-gray-900'
//     },
//     {
//       id: 'dark',
//       name: 'Dark',
//       icon: Moon,
//       description: 'Dark theme for low-light environments',
//       preview: 'bg-gray-900 text-white'
//     },
//   ];

//   return (
//     <>
//       {/* Overlay */}
//       <div 
//         className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-auto setting-scroll">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-gray-100 dark:bg-gray-400 rounded-lg">
//                 <Palette className="w-5 h-5 text-gray-900 dark:text-gray-400" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-400">
//                   Settings
//                 </h2>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Customize your CrewNest experience
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="p-6">
//             {/* Theme Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-gray-400 mb-2">
//                 Appearance
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                 Choose how CrewNest looks to you. Select a single theme for your system.
//               </p>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {themeOptions.map((theme) => {
//                   const IconComponent = theme.icon;
//                   return (
//                     <div
//                       key={theme.id}
//                       className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
//                         activeTheme === theme.id
//                           ? 'border-gray-900 bg-gray-50 dark:bg-gray-400'
//                           : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
//                       }`}
//                       onClick={() => setActiveTheme(theme.id)}
//                     >
//                       {/* Theme Preview */}
//                       <div className={`w-full h-16 rounded-md mb-3 ${theme.preview} flex items-center justify-center`}>
//                         <IconComponent className="w-6 h-6" />
//                       </div>
                      
//                       {/* Theme Info */}
//                       <div className="flex items-center gap-2 mb-1">
//                         <div className={`w-2 h-2 rounded-full ${
//                           activeTheme === theme.id ? 'bg-gray-900' : 'bg-gray-300 dark:bg-gray-600'
//                         }`} />
//                         <h4 className="font-medium text-gray-900 dark:text-gray-400">
//                           {theme.name}
//                         </h4>
//                       </div>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         {theme.description}
//                       </p>
                      
//                       {activeTheme === theme.id && (
//                         <div className="absolute top-2 right-2 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
//                           <div className="w-2 h-2 bg-white rounded-full" />
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Other Settings Sections (placeholder) */}
//             <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-gray-400 mb-2">
//                 Notifications
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                 Control how you receive notifications
//               </p>
//               <div className="space-y-3">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="rounded border-gray-300 text-gray-900 mr-3" defaultChecked />
//                   <span className="text-sm text-gray-700 dark:text-gray-300">Desktop notifications</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input type="checkbox" className="rounded border-gray-300 text-gray-900 mr-3" defaultChecked />
//                   <span className="text-sm text-gray-700 dark:text-gray-300">Sound notifications</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input type="checkbox" className="rounded border-gray-300 text-gray-900 mr-3" />
//                   <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 // Here you would implement the actual theme change logic
//                 console.log('Saving theme:', activeTheme);
//                 onClose();
//               }}
//               className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-l rounded-lg transition-colors"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SettingsModal;



'use client';

import React, { useState, useEffect } from 'react';
import { X, Palette, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const SettingsModal = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState('system');

  // Sync current theme to local state on mount
  useEffect(() => {
    if (theme) {
      setActiveTheme(theme);
    }
  }, [theme]);

  if (!isOpen) return null;

  const themeOptions = [
    {
      id: 'light',
      name: 'Light',
      icon: Sun,
      description: 'Light theme for daytime use',
      preview: 'bg-white text-gray-900'
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: Moon,
      description: 'Dark theme for low-light environments',
      preview: 'bg-gray-900 text-white'
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-auto setting-scroll">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-400 rounded-lg">
                <Palette className="w-5 h-5 text-gray-900 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-400">
                  Settings
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize your CrewNest experience
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Theme Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-400 mb-2">
                Appearance
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Choose how CrewNest looks to you. Select a single theme for your system.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themeOptions.map((themeOption) => {
                  const IconComponent = themeOption.icon;
                  return (
                    <div
                      key={themeOption.id}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        activeTheme === themeOption.id
                          ? 'border-gray-900 bg-gray-50 dark:bg-gray-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setActiveTheme(themeOption.id)}
                    >
                      {/* Theme Preview */}
                      <div className={`w-full h-16 rounded-md mb-3 ${themeOption.preview} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      {/* Theme Info */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                          activeTheme === themeOption.id ? 'bg-gray-900' : 'bg-gray-300 dark:bg-gray-600'
                        }`} />
                        <h4 className="font-medium text-gray-900 dark:text-gray-400">
                          {themeOption.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {themeOption.description}
                      </p>
                      
                      {activeTheme === themeOption.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Other Settings Sections (placeholder) */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-400 mb-2">
                Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Control how you receive notifications
              </p>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-gray-900 mr-3" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Desktop notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-gray-900 mr-3" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Sound notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-gray-900 mr-3" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setTheme(activeTheme); // ✅ Set the selected theme
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
