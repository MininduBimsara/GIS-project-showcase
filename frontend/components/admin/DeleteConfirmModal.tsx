"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  projectTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function DeleteConfirmModal({
  projectTitle,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (isLoading) return;
      if (e.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isLoading, onCancel]);

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-100 flex items-center justify-center p-4 z-50"
      onMouseDown={(e) => {
        // Only trigger when clicking the overlay itself (not the card)
        if (isLoading) return;
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl font-serif">Delete Project</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gov-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">&quot;{projectTitle}&quot;</span>?
          </p>
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. This will
              permanently delete the project and all its language versions
              (English, Sinhala, Tamil).
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 hover:bg-gov-gray-100"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 text-red-700 hover:bg-red-100"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
