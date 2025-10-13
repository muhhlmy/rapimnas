// composables/useSidebar.js
export const useSidebar = () => {
    const isOpen = useState('sidebarIsOpen', () => false);
  
    const toggleSidebar = () => {
      isOpen.value = !isOpen.value;
    };
  
    return {
      isOpen,
      toggleSidebar,
    };
  };