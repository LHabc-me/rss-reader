package com.backend.rssparser.mapper;

import com.backend.rssparser.entity.Rss;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RssCRUD extends BaseMapper<Rss> {}
