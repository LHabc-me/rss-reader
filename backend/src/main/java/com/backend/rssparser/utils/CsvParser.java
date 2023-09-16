package com.backend.rssparser.utils;

import com.opencsv.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class CsvParser {
    /**
     * 解析csv文件并转成bean（方法二）
     *
     * @param file csv文件
     * @return 数组
     */
    public static List<String[]> getCsvDataMethod(MultipartFile file) {

        List<String[]> list = new ArrayList<>();
        int i = 0;
        try {
            CSVReader csvReader = new CSVReaderBuilder(
                    new BufferedReader(
                            new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))).build();
            for (String[] next : csvReader) {
                //去除第一行的表头，从第二行开始
                if (i >= 1) {
                    list.add(next);
                }
                i++;
            }
            return list;
        } catch (Exception e) {
            System.out.println("CSV文件读取异常");
            return list;
        }
    }
}


