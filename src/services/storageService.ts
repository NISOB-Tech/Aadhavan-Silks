
import { Saree } from "../types";
import { sareesData } from "../mockData";

// Consistent storage key used across the application
export const SAREES_STORAGE_KEY = "admin_sarees_data";

/**
 * Get all sarees from localStorage or initialize with mock data
 */
export const getSarees = (): Saree[] => {
  const savedSarees = localStorage.getItem(SAREES_STORAGE_KEY);
  if (savedSarees) {
    try {
      return JSON.parse(savedSarees);
    } catch (error) {
      console.error("Error parsing sarees from localStorage:", error);
      // If data is corrupted, reset to default data
      saveSarees(sareesData);
      return sareesData;
    }
  } else {
    // Initialize with mock data on first load
    saveSarees(sareesData);
    return sareesData;
  }
};

/**
 * Save sarees to localStorage
 */
export const saveSarees = (sarees: Saree[]): void => {
  try {
    localStorage.setItem(SAREES_STORAGE_KEY, JSON.stringify(sarees));
  } catch (error) {
    console.error("Error saving sarees to localStorage:", error);
  }
};

/**
 * Add or update a saree
 */
export const saveSaree = (saree: Saree): Saree[] => {
  const sarees = getSarees();
  const existingIndex = sarees.findIndex(s => s.id === saree.id);
  
  if (existingIndex >= 0) {
    // Update existing saree
    sarees[existingIndex] = saree;
  } else {
    // Add new saree
    sarees.push(saree);
  }
  
  saveSarees(sarees);
  return sarees;
};

/**
 * Delete a saree
 */
export const deleteSaree = (sareeId: string): Saree[] => {
  const sarees = getSarees();
  const updatedSarees = sarees.filter(s => s.id !== sareeId);
  saveSarees(updatedSarees);
  return updatedSarees;
};

/**
 * Get a saree by ID
 */
export const getSareeById = (sareeId: string): Saree | undefined => {
  const sarees = getSarees();
  return sarees.find(s => s.id === sareeId);
};

/**
 * Toggle featured status of a saree
 */
export const toggleFeaturedStatus = (sareeId: string): Saree[] => {
  const sarees = getSarees();
  const updatedSarees = sarees.map(saree => 
    saree.id === sareeId 
      ? { ...saree, featured: !saree.featured }
      : saree
  );
  
  saveSarees(updatedSarees);
  return updatedSarees;
};
