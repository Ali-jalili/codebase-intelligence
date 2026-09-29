/** @format */

"use client";

/** @format */

import { Handle, Position, type NodeProps } from "@xyflow/react";

type FileNodeData = {
  label: string;
};

export default function FileNode({ data }: NodeProps) {
  const normalizedPath = data.label.replaceAll("\\", "/");

  const parts = normalizedPath.split("/");
  const fileName = parts.at(-1) ?? normalizedPath;
  const directory = parts.slice(0, -1).join("/");

  return (
    <div className="w-[220px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-2 !border-white !bg-slate-400"
      />

      <div className="border-b border-slate-100 px-3 py-1.5">
        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
          File
        </span>
      </div>

      <div className="px-3 py-2">
        <div
          title={fileName}
          className="truncate text-xs font-semibold text-slate-800"
        >
          {fileName}
        </div>

        <div
          title={directory}
          className="mt-1 truncate font-mono text-[9px] text-slate-400"
        >
          {directory || "/"}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-2 !border-white !bg-slate-400"
      />
    </div>
  );
}
