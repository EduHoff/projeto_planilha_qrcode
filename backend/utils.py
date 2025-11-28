import csv
import xlrd
import xlwt
import openpyxl
import os
from pathlib import Path


# =====================================================================
# CSV
# =====================================================================

def count_csv_rows(path: str) -> int:
    if not os.path.exists(path):
        return 0

    with open(path, mode='r', newline='') as file:
        reader = csv.reader(file)

        rows = [row for row in reader if any(cell.strip() for cell in row)]
        return len(rows)


def append_to_csv(path: str, data: list) -> int:
    existing = count_csv_rows(path)
    next_id = existing + 1

    with open(path, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([next_id] + data)

    return next_id



# =====================================================================
# XLS (formato antigo)
# =====================================================================

def count_xls_rows(path: str) -> int:
    if not os.path.exists(path):
        return 0

    workbook = xlrd.open_workbook(path)
    sheet = workbook.sheet_by_index(0)

    count = 0
    for row_idx in range(sheet.nrows):
        row = sheet.row_values(row_idx)
        if any(str(cell).strip() for cell in row):
            count += 1
    return count


def append_to_xls(path: str, data: list) -> int:
    if not os.path.exists(path):
        workbook = xlwt.Workbook()
        sheet = workbook.add_sheet("Sheet1")

        next_id = 1
        sheet.write(0, 0, next_id)
        for i, value in enumerate(data, start=1):
            sheet.write(0, i, value)

        workbook.save(path)
        return next_id

    rb = xlrd.open_workbook(path, formatting_info=True)
    r_sheet = rb.sheet_by_index(0)

    existing_rows = count_xls_rows(path)
    next_id = existing_rows + 1

    wb = xlwt.Workbook()
    sheet = wb.add_sheet("Sheet1")

    for row_idx in range(r_sheet.nrows):
        for col_idx in range(r_sheet.ncols):
            sheet.write(row_idx, col_idx, r_sheet.cell_value(row_idx, col_idx))

    new_row = existing_rows
    sheet.write(new_row, 0, next_id)
    for i, value in enumerate(data, start=1):
        sheet.write(new_row, i, value)

    wb.save(path)
    return next_id



# =====================================================================
# XLSX / XLSM (openpyxl)
# =====================================================================

def count_xlsx_rows(path: str) -> int:
    if not os.path.exists(path):
        return 0

    wb = openpyxl.load_workbook(path)
    ws = wb.active

    count = 0
    for row in ws.iter_rows(values_only=True):
        if any(str(cell).strip() for cell in row if cell is not None):
            count += 1
    return count


def append_to_xlsx(path: str, data: list) -> int:
    if not os.path.exists(path):

        wb = openpyxl.Workbook()
        ws = wb.active

        next_id = 1
        ws.append([next_id] + data)

        wb.save(path)
        return next_id

    wb = openpyxl.load_workbook(path)
    ws = wb.active

    existing_rows = count_xlsx_rows(path)
    next_id = existing_rows + 1

    ws.append([next_id] + data)
    wb.save(path)

    return next_id



# =====================================================================
# DISPATCHER GERAL
# =====================================================================


def add_row(path: str | Path, data: list) -> int:

    extension = str(path).lower()

    if extension.endswith(".csv"):
        return append_to_csv(path, data)

    if extension.endswith(".xls"):
        return append_to_xls(path, data)

    if extension.endswith(".xlsx") or extension.endswith(".xlsm"):
        return append_to_xlsx(path, data)

    raise ValueError(f"Formato de arquivo não suportado: {path}")
