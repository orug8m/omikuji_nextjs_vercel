#!/usr/bin/env python3
"""
マルチルートワークスペースの設定ファイルを作成するツール
指定されたディレクトリ内のサブディレクトリをインタラクティブに選択して、
VS Codeのワークスペース設定ファイルを生成します。
"""

import os
import json
import sys
from pathlib import Path
from typing import List, Dict, Any


def get_subdirectories(directory_path: str) -> List[str]:
    """指定されたディレクトリ内のサブディレクトリを取得"""
    try:
        path = Path(directory_path)
        if not path.exists():
            print(f"エラー: ディレクトリ '{directory_path}' が存在しません。")
            return []

        if not path.is_dir():
            print(f"エラー: '{directory_path}' はディレクトリではありません。")
            return []

        subdirs = [d.name for d in path.iterdir() if d.is_dir()]
        return sorted(subdirs)
    except Exception as e:
        print(f"エラー: ディレクトリの読み取り中にエラーが発生しました: {e}")
        return []


def display_directory_selection(subdirs: List[str]) -> None:
    """ディレクトリ選択画面を表示"""
    print("\n利用可能なディレクトリ:")
    print("-" * 40)
    for i, subdir in enumerate(subdirs, 1):
        print(f"{i:2d}. {subdir}")
    print("-" * 40)


def get_user_selection(subdirs: List[str]) -> List[str]:
    """ユーザーからディレクトリ選択を取得"""
    selected_dirs = []

    while True:
        try:
            choice = input("\n選択するディレクトリの番号を入力してください (複数の場合はカンマ区切り、終了は 'q'): ").strip()

            if choice.lower() == 'q':
                break

            if not choice:
                print("番号を入力してください。")
                continue

            # カンマ区切りの番号を処理
            numbers = [num.strip() for num in choice.split(',')]
            valid_numbers = []

            for num in numbers:
                try:
                    index = int(num) - 1
                    if 0 <= index < len(subdirs):
                        valid_numbers.append(index)
                    else:
                        print(f"警告: 番号 {num} は範囲外です。")
                except ValueError:
                    print(f"警告: '{num}' は有効な番号ではありません。")

            if valid_numbers:
                selected_dirs = [subdirs[i] for i in valid_numbers]
                break
            else:
                print("有効な番号が選択されていません。")

        except KeyboardInterrupt:
            print("\n\n操作がキャンセルされました。")
            sys.exit(1)
        except Exception as e:
            print(f"エラー: {e}")

    return selected_dirs


def create_workspace_config(selected_dirs: List[str], base_path: str) -> Dict[str, Any]:
    """ワークスペース設定を生成"""
    folders = []

    for dir_name in selected_dirs:
        # 相対パスを使用
        folder_config = {
            "path": dir_name
        }
        folders.append(folder_config)

    workspace_config = {
        "folders": folders,
        "settings": {}
    }

    return workspace_config


def save_workspace_file(config: Dict[str, Any], output_path: str) -> bool:
    """ワークスペース設定ファイルを保存"""
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"エラー: ファイルの保存中にエラーが発生しました: {e}")
        return False


def main():
    """メイン関数"""
    print("マルチルートワークスペース設定ファイル作成ツール")
    print("=" * 50)

    # ベースディレクトリの入力
    while True:
        base_dir = input("ディレクトリのパスを入力してください (現在のディレクトリの場合は '.'): ").strip()

        if not base_dir:
            base_dir = "."

        if base_dir == ".":
            base_dir = os.getcwd()

        subdirs = get_subdirectories(base_dir)

        if subdirs:
            break
        else:
            print("サブディレクトリが見つかりませんでした。別のパスを試してください。")

    print(f"\nベースディレクトリ: {base_dir}")

    # ディレクトリ選択
    display_directory_selection(subdirs)
    selected_dirs = get_user_selection(subdirs)

    if not selected_dirs:
        print("ディレクトリが選択されませんでした。")
        return

    print(f"\n選択されたディレクトリ: {', '.join(selected_dirs)}")

    # ワークスペース設定を生成
    workspace_config = create_workspace_config(selected_dirs, base_dir)

    # 出力ファイル名の入力
    while True:
        workspace_name = input("\nワークスペースファイル名を入力してください (拡張子なし): ").strip()

        if not workspace_name:
            print("ファイル名を入力してください。")
            continue

        # .code-workspace拡張子を追加
        output_filename = f"{workspace_name}.code-workspace"
        output_path = os.path.join(base_dir, output_filename)

        if os.path.exists(output_path):
            overwrite = input(f"ファイル '{output_filename}' は既に存在します。上書きしますか？ (y/N): ").strip().lower()
            if overwrite != 'y':
                continue

        break

    # ファイルを保存
    if save_workspace_file(workspace_config, output_path):
        print(f"\n✅ ワークスペース設定ファイルが正常に作成されました:")
        print(f"   ファイル: {output_path}")
        print(f"   含まれるディレクトリ: {', '.join(selected_dirs)}")

        # 設定内容を表示
        print(f"\n📄 設定内容:")
        print(json.dumps(workspace_config, indent=2, ensure_ascii=False))
    else:
        print("❌ ワークスペース設定ファイルの作成に失敗しました。")


if __name__ == "__main__":
    main()
