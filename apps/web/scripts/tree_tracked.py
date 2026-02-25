#!/usr/bin/env python3

from __future__ import annotations

import subprocess
from pathlib import Path, PurePosixPath


def main() -> int:
    tracked = subprocess.check_output(["git", "ls-files"], text=True).splitlines()
    files: list[str] = []
    for item in tracked:
        if not item:
            continue
        if item.startswith("apps/web/"):
            files.append(item[len("apps/web/"):])
            continue
        if item.startswith("../"):
            continue
        files.append(item)

    if not files:
        base = Path.cwd()
        ignore_dirs = {".git", "node_modules", "dist", ".mypy_cache", ".pytest_cache", ".preview"}
        files = []
        for path in base.rglob("*"):
            if any(part in ignore_dirs for part in path.parts):
                continue
            if path.is_file():
                files.append(path.relative_to(base).as_posix())

    root: dict[str, dict] = {}
    for file_path in files:
        parts = PurePosixPath(file_path).parts
        node = root
        for index, part in enumerate(parts):
            if index == len(parts) - 1:
                node.setdefault("__files__", []).append(part)
            else:
                node = node.setdefault(part, {})

    def walk(node: dict, prefix: str = "") -> None:
        directories = sorted(name for name in node.keys() if name != "__files__")
        file_names = sorted(node.get("__files__", []))
        entries = [("dir", name) for name in directories] + [("file", name) for name in file_names]

        for index, (kind, name) in enumerate(entries):
            is_last = index == len(entries) - 1
            marker = "└── " if is_last else "├── "
            print(prefix + marker + name + ("/" if kind == "dir" else ""))
            if kind == "dir":
                walk(node[name], prefix + ("    " if is_last else "│   "))

    print(".")
    walk(root)
    print(f"\n{len(files)} tracked files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
