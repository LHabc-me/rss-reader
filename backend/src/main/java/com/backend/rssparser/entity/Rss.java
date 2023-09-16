package com.backend.rssparser.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("rss_source")
@Data
public class Rss {
    @TableId(value = "ID", type = IdType.AUTO)
    private int id;
    @TableField("Title")
    private String Title;
    @TableField("Link")
    private String Link;
    @TableField("Flag")
    private boolean flag = true;

    public Rss(String Title, String Link) {
        this.Title = Title;
        this.Link = Link;
    }
}
