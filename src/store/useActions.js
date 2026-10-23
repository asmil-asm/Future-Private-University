import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useActions = create(
  persist(
    (set) => ({
      // state
      menu: false,
      selectedJob: null,
      applyForm: false,
      language: 'en',
      selectedDepartment: '',
      selectedStaff: null,
      selectedResearch: null,
      show: false,
      selectedProgram: null,

      // actions
      setMenu: () => set((state) => ({ menu: !state.menu })),
      setSelectedJob: (value) => set(() => ({ selectedJob: value })),
      setApply: () => set((state) => ({ applyForm: !state.applyForm })),
      setLanguage: (value) => set(() => ({ language: value })),
      setSelectedDepartment: (value) => set(() => ({ selectedDepartment: value })),
      setSelectedStaff: (value) => set(() => ({ selectedStaff: value })),
      setSelectedResearch: (value) => set(() => ({ selectedResearch: value })),
      setShow: () => set((state) => ({ show: !state.show })),
      setSelectedProgram: (value) => set(() => ({ selectedProgram: value })),
    }),
    {
      name: 'app-storage', 
      partialize: (state) => ({ language: state.language }), 
    }
  )
);