package edu.kh.plklj.common.util;

import java.io.File;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import edu.kh.plklj.pay.dto.PaymentDto;

public class ExcelExporter {
	
	public int exportToExcel(List<PaymentDto> dtoList, String filePath) {
        // 워크북 생성 (XSSF는 .xlsx 파일 형식에 사용)
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");

        // 헤더 작성 (DTO 클래스의 필드 이름)
        Row headerRow = sheet.createRow(0);
        String[] columns = {"회원번호", "이름", "송금액", "은행코드", "은행명", "계좌번호"}; // DTO의 필드명에 맞게 수정
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
        }

        // 데이터 작성
        int rowNum = 1;
        for (PaymentDto dto : dtoList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(dto.getMemberNo());    // ID 필드
            row.createCell(1).setCellValue(dto.getMemberName());  // Name 필드
            row.createCell(2).setCellValue( Integer.parseInt(dto.getPriceSum()) * 0.899);    // Age 필드
            row.createCell(3).setCellValue(dto.getBankCode());
            row.createCell(4).setCellValue(dto.getBankName());
			row.createCell(5).setCellValue(dto.getBankNo());
        }

        File file = new File(filePath);
        if(file.exists() == false) {
        	file.mkdirs();
        }
        
        // 파일로 저장
        try (FileOutputStream fileOut = new FileOutputStream(filePath + "withdraw.xlsx")) {
            workbook.write(fileOut);
            System.out.println("Excel file created: " + filePath);
            return 1;
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        } finally {
            try {
                workbook.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
