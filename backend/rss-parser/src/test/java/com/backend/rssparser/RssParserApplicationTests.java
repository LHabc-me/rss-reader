package com.backend.rssparser;

import com.backend.rssparser.entity.Rss;
import com.backend.rssparser.mapper.RssCRUD;
import com.backend.rssparser.utils.CsvParser;
import com.backend.rssparser.utils.JasyptEncryptorUtils;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@SpringBootTest
class RssParserApplicationTests {
    @Resource
    RssCRUD rssCRUD;

    @Test
    void contextLoads() throws IOException {
        // 从外界读取csv文件
//        MultipartFile file = ;
//        File file = new File("/Users/kina0630/CodeAbout/Java/rss-reader/backend/rss-parser/src/main/resources/csv/github_rss.csv");
        File file = new File("/Users/kina0630/CodeAbout/Java/rss-reader/backend/rss-parser/src/main/resources/csv/source_rss.csv");
        MultipartFile multipartFile = new MockMultipartFile(file.getName(), new FileInputStream(file));
        // 解析csv文件,并转为json
        List<String[]> list = CsvParser.getCsvDataMethod(multipartFile);
         for (String[] strings : list) {
             System.out.println("title:" + strings[0] + ",url:" + strings[1]);
             System.out.println(rssCRUD.insert(new Rss(strings[0], strings[1])));
         }
    }

    @Test
    void test() {
        JasyptEncryptorUtils.encode("jdbc:mysql://www.kina0630.xyz:3306/backend?Unicode=true&characterEncoding=UTF-8");
        JasyptEncryptorUtils.encode("root");
        JasyptEncryptorUtils.encode("323xZJQ030701");
//        JasyptEncryptorUtils.decode("0uv3jWIQGxtpMuUyWzYYol1gleswEhTxoDiEjjc+xhaR9owiRUBnJUYl3HBRtG1HylDJLXIyBX/d7KTzcbrSkgj08w+bPV0KFWBglejsBDo=");
//        JasyptEncryptorUtils.decode("5rOYr7TnxeA3TBaKZBiUsZvykSfoUW82");
//        JasyptEncryptorUtils.decode("p2Seg+iZDqyUZcrO/xLFoQ==");
    }
}
