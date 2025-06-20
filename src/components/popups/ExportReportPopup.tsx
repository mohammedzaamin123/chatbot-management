
import React, { useState } from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Calendar, FileText, Download, Mail } from 'lucide-react';

interface ExportReportPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportPopup: React.FC<ExportReportPopupProps> = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      onClose();
      // In a real app, this would trigger the actual export
      console.log(`Exporting ${selectedFormat} report for ${selectedPeriod}`);
    }, 2000);
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Export Analytics Report"
      description="Choose your preferred format and time period"
      size="md"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3 font-inter">Report Format</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'pdf', label: 'PDF', icon: FileText },
              { value: 'excel', label: 'Excel', icon: FileText },
              { value: 'csv', label: 'CSV', icon: FileText },
            ].map((format) => (
              <Card
                key={format.value}
                className={`cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedFormat === format.value
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'glass border-white/20'
                }`}
                onClick={() => setSelectedFormat(format.value as typeof selectedFormat)}
              >
                <CardContent className="p-3 text-center">
                  <format.icon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium font-inter">{format.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 font-inter">Time Period</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'week', label: 'Last Week' },
              { value: 'month', label: 'Last Month' },
              { value: 'quarter', label: 'Last Quarter' },
            ].map((period) => (
              <Card
                key={period.value}
                className={`cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedPeriod === period.value
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'glass border-white/20'
                }`}
                onClick={() => setSelectedPeriod(period.value as typeof selectedPeriod)}
              >
                <CardContent className="p-3 text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium font-inter">{period.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-inter">
            <Mail className="w-4 h-4" />
            Report will be sent to your registered email address
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose} disabled={isExporting}>
          Cancel
        </Button>
        <Button 
          className="btn-primary"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </>
          )}
        </Button>
      </div>
    </Popup>
  );
};
