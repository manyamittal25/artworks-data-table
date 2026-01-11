import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Artwork } from '../types/artwork';
import { fetchArtworksPage } from '../api/artworksApi';
import { SelectedCountBadge } from './SelectedCountBadge';
import { SelectionOverlay } from './SelectionOverlay';

export const ArtworkTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(12);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [currentPageData, setCurrentPageData] = useState<Artwork[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage]);

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchArtworksPage(page);
      setCurrentPageData(response.data);
      setTotalRecords(response.pagination.total);
    } catch (error) {
      console.error('Error loading artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: any) => {
    const newPage = (event.first / event.rows) + 1;
    setCurrentPage(newPage);
  };

  const handleSelectionChange = (event: any) => {
    const newSelection = event.value as Artwork[];
    const newSelectedIds = new Set(selectedIds);
    
    if (event.type === 'all') {
      if (newSelection.length === currentPageData.length) {
        currentPageData.forEach((artwork) => {
          newSelectedIds.add(artwork.id);
        });
      } else {
        currentPageData.forEach((artwork) => {
          newSelectedIds.delete(artwork.id);
        });
      }
    } else {
      const currentPageSelectedIds = new Set(
        currentPageData.filter(artwork => selectedIds.has(artwork.id)).map(a => a.id)
      );
      const newPageSelectedIds = new Set(newSelection.map(a => a.id));
      
      currentPageData.forEach((artwork) => {
        if (currentPageSelectedIds.has(artwork.id) && !newPageSelectedIds.has(artwork.id)) {
          newSelectedIds.delete(artwork.id);
        } else if (!currentPageSelectedIds.has(artwork.id) && newPageSelectedIds.has(artwork.id)) {
          newSelectedIds.add(artwork.id);
        }
      });
    }
    
    setSelectedIds(newSelectedIds);
  };

  const handleOverlaySelect = (count: number) => {
    const newSelectedIds = new Set(selectedIds);
    let added = 0;
    
    for (const artwork of currentPageData) {
      if (added >= count) break;
      if (!newSelectedIds.has(artwork.id)) {
        newSelectedIds.add(artwork.id);
        added++;
      }
    }
    
    setSelectedIds(newSelectedIds);
  };

  const formatCell = (value: any): string => {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return String(value);
  };

  const formatDate = (value: number | null): string => {
    if (value === null || value === undefined) {
      return '—';
    }
    return String(value);
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <SelectedCountBadge count={selectedIds.size} />
        <SelectionOverlay
          onSelect={handleOverlaySelect}
          trigger={
            <button style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
            >
              <i className="pi pi-sliders-h" style={{ marginRight: '0.5rem' }}></i>
              Custom Selection
            </button>
          }
        />
      </div>
      
      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e9ecef',
      }}>
        <DataTable
          value={currentPageData}
          lazy
          paginator
          first={(currentPage - 1) * rowsPerPage}
          rows={rowsPerPage}
          totalRecords={totalRecords}
          onPage={handlePageChange}
          loading={loading}
          selectionMode="checkbox"
          selection={currentPageData.filter(artwork => selectedIds.has(artwork.id))}
          onSelectionChange={handleSelectionChange}
          dataKey="id"
          emptyMessage="No artworks found"
          style={{
            fontSize: '0.95rem',
          }}
          pt={{
            headerRow: {
              style: {
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                fontWeight: 600,
                color: '#495057',
              }
            },
            bodyRow: {
              style: {
                transition: 'background-color 0.2s ease',
              }
            }
          }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: '3rem', textAlign: 'center' }}
          />
          <Column 
            field="title" 
            header="Title" 
            body={(rowData: Artwork) => (
              <span style={{ fontWeight: 600, color: '#212529' }}>
                {formatCell(rowData.title)}
              </span>
            )}
            style={{ minWidth: '200px' }}
          />
          <Column 
            field="place_of_origin" 
            header="Place of Origin"
            body={(rowData: Artwork) => (
              <span style={{ color: '#6c757d' }}>
                {formatCell(rowData.place_of_origin)}
              </span>
            )}
            style={{ minWidth: '150px' }}
          />
          <Column 
            field="artist_display" 
            header="Artist"
            body={(rowData: Artwork) => (
              <span style={{ color: '#495057', fontStyle: rowData.artist_display ? 'normal' : 'italic' }}>
                {formatCell(rowData.artist_display)}
              </span>
            )}
            style={{ minWidth: '200px' }}
          />
          <Column 
            field="inscriptions" 
            header="Inscriptions"
            body={(rowData: Artwork) => (
              <span style={{ 
                color: '#6c757d',
                fontSize: '0.9rem',
                maxWidth: '300px',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {formatCell(rowData.inscriptions)}
              </span>
            )}
            style={{ minWidth: '200px', maxWidth: '300px' }}
          />
          <Column 
            field="date_start" 
            header="Start Date"
            body={(rowData: Artwork) => (
              <span style={{ 
                color: '#667eea',
                fontWeight: 500,
              }}>
                {formatDate(rowData.date_start)}
              </span>
            )}
            style={{ minWidth: '100px' }}
          />
          <Column 
            field="date_end" 
            header="End Date"
            body={(rowData: Artwork) => (
              <span style={{ 
                color: '#764ba2',
                fontWeight: 500,
              }}>
                {formatDate(rowData.date_end)}
              </span>
            )}
            style={{ minWidth: '100px' }}
          />
        </DataTable>
      </div>
    </div>
  );
};
