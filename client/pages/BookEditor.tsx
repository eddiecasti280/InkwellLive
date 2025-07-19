import React, { useState } from "react";
import { Book, BookSection, BookSectionType } from "../lib/bookTypes";
import { Button } from "../components/ui/button";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

// Mock initial data
const initialBook: Book = {
  id: "book1",
  title: "My New Book",
  authorId: "user1",
  sections: [
    { id: "sec1", type: "cover", title: "Cover", content: {}, order: 0 },
    { id: "sec2", type: "toc", title: "Table of Contents", content: {}, order: 1 },
    { id: "sec3", type: "chapter", title: "Chapter 1", content: { text: "..." }, order: 2 },
    { id: "sec4", type: "index", title: "Index", content: {}, order: 3 },
  ],
};

const sectionTypeLabels: Record<BookSectionType, string> = {
  cover: "Cover",
  toc: "Table of Contents",
  introduction: "Introduction",
  chapter: "Chapter",
  index: "Index",
  custom: "Custom Section",
};

const availableSectionTypes: BookSectionType[] = [
  "cover",
  "toc",
  "introduction",
  "chapter",
  "index",
  "custom",
];

function SortableSection({ section, idx, removeSection }: { section: BookSection; idx: number; removeSection: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? "#f5f5f5" : undefined,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 mb-2 p-2 border rounded bg-white shadow-sm cursor-pointer"
    >
      <span {...attributes} {...listeners} className="cursor-grab text-gray-400 mr-2">
        <GripVertical className="h-5 w-5" />
      </span>
      <span className="font-medium w-40">{sectionTypeLabels[section.type]}</span>
      <span className="text-gray-500 flex-1">{section.title}</span>
      <Button size="sm" variant="destructive" onClick={() => removeSection(section.id)}>
        Remove
      </Button>
    </li>
  );
}

export default function BookEditor() {
  const [book, setBook] = useState<Book>(initialBook);

  // dnd-kit sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Add a new section
  const addSection = (type: BookSectionType) => {
    const newSection: BookSection = {
      id: `sec${Date.now()}`,
      type,
      title: sectionTypeLabels[type],
      content: {},
      order: book.sections.length,
    };
    setBook({
      ...book,
      sections: [...book.sections, newSection],
    });
  };

  // Remove a section
  const removeSection = (id: string) => {
    setBook({
      ...book,
      sections: book.sections.filter((s) => s.id !== id),
    });
  };

  // Handle drag end
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = book.sections.findIndex((s) => s.id === active.id);
      const newIndex = book.sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(book.sections, oldIndex, newIndex).map((s, i) => ({ ...s, order: i }));
      setBook({ ...book, sections: newSections });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Book Editor</h1>
      <h2 className="text-xl font-semibold mb-4">Sections</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={book.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <ul className="mb-8">
            {book.sections.map((section, idx) => (
              <SortableSection key={section.id} section={section} idx={idx} removeSection={removeSection} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add Section</h3>
        <div className="flex gap-2 flex-wrap">
          {availableSectionTypes.map((type) => (
            <Button key={type} size="sm" variant="secondary" onClick={() => addSection(type)}>
              + {sectionTypeLabels[type]}
            </Button>
          ))}
        </div>
      </div>
      {/* Placeholder for section content editing */}
      <div className="mt-10 text-gray-500">Section content editing coming soon...</div>
    </div>
  );
} 