#!/usr/bin/env python3

"""
`sample.env`を元に環境変数 (クレデンシャル) を`.env`にセットするスクリプトです.
このスクリプトを実行すると, 対話的にクレデンシャルの入力を促します.

`.env`に設定されるデータの優先順位は以下の通りです.

1. ユーザの空でない入力
2. `.env`にすでに設定されている値
3. `sample.env`に設定されているデフォルト値

`.env`に存在せず, `sample.env`に存在する環境変数は自動で追記します.

`.env`に存在するが, `sample.env`に存在しない環境変数はそのまま残します.
このプログラムを実行しても表示しません.
"""

import os

# print(os.getcwd()) - /workspaces/cloudflare-monorepo-template

if not os.path.exists(".env"):
    with open(".env", "w") as f: pass

def build_table(path):
    table = {}
    with open(path, "r") as f:
        for line in f:
            if "=" in line:
                key, value = line.strip().split("=", 1)
                table[key.strip()] = value.strip()
    return table

env_values = build_table(".env")
env_samples = build_table("sample.env")

print("""
環境変数を設定します. 変更/設定が必要な場合は, 新しい設定値を入力してEnterを押してください.
[デフォルト値/既定値]からの変更が不要な場合は何も入力せずにEnterを押してください.
""")

for key, default_value in env_samples.items():
    current_value = env_values.get(key, default_value)
    label = f"{key} [{current_value}]: " if current_value else f"{key}: "
    user_input = input(label).strip()
    if user_input:
        env_values[key] = user_input
    else:
        env_values[key] = current_value

with open(".env", "w") as f:
    for key, value in env_values.items():
        f.write(f"{key}={value}\n")

print(".envファイルが更新されました.")