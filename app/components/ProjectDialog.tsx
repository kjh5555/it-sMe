import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

interface ProjectDialogProps {
  project: {
    title: string;
    description: string;
    details: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDialog({ project, isOpen, onClose }: ProjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </div>
        <div className="space-y-4 p-4">
          <p>{project.details}</p>
          {/* 추가적인 프로젝트 정보나 설명이 여기에 들어갈 수 있습니다 */}
        </div>
        <div className="p-4 flex justify-end">
          <Button onClick={onClose}>닫기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 