package seb39_40.coffeewithme.cafe.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.domain.CafeTag;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-27T22:29:22+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class CafeMapperImpl extends CafeMapper {

    @Override
    public CafeResponseDto.DetailCafeInfo cafeToCafeDto(Cafe cafe) {
        if ( cafe == null ) {
            return null;
        }

        CafeResponseDto.DetailCafeInfo detailCafeInfo = new CafeResponseDto.DetailCafeInfo();

        List<CafeTag> list = cafe.getCafeTags();
        if ( list != null ) {
            detailCafeInfo.setCafeTags( new ArrayList<CafeTag>( list ) );
        }
        detailCafeInfo.setId( cafe.getId() );
        detailCafeInfo.setName( cafe.getName() );
        detailCafeInfo.setDescription( cafe.getDescription() );
        detailCafeInfo.setAddress( cafe.getAddress() );
        detailCafeInfo.setLikeCount( cafe.getLikeCount() );
        detailCafeInfo.setReviewCount( cafe.getReviewCount() );
        detailCafeInfo.setBadge( cafe.getBadge() );

        detailCafeInfo.setRunningTime( cafe.getOpenTime() + '-' + cafe.getCloseTime() );
        detailCafeInfo.setMainImg( imageService.findById(cafe.getMainImg()).getPath() );
        detailCafeInfo.setMenuImg( imageService.findById(cafe.getMenuImg()).getPath() );

        return detailCafeInfo;
    }

    @Override
    public CafeResponseDto.SimpleCafeInfo cafeToCafeSimpleDto(Cafe cafe) {
        if ( cafe == null ) {
            return null;
        }

        CafeResponseDto.SimpleCafeInfo simpleCafeInfo = new CafeResponseDto.SimpleCafeInfo();

        List<CafeTag> list = cafe.getCafeTags();
        if ( list != null ) {
            simpleCafeInfo.setCafeTags( new ArrayList<CafeTag>( list ) );
        }
        simpleCafeInfo.setId( cafe.getId() );
        simpleCafeInfo.setName( cafe.getName() );

        simpleCafeInfo.setMainImg( imageService.findById(cafe.getMainImg()).getPath() );

        return simpleCafeInfo;
    }

    @Override
    public List<CafeResponseDto.SimpleCafeInfo> cafeListToCafeSimpleDto(List<Cafe> cafe) {
        if ( cafe == null ) {
            return null;
        }

        List<CafeResponseDto.SimpleCafeInfo> list = new ArrayList<CafeResponseDto.SimpleCafeInfo>( cafe.size() );
        for ( Cafe cafe1 : cafe ) {
            list.add( cafeToCafeSimpleDto( cafe1 ) );
        }

        return list;
    }

    @Override
    public Cafe cafeDtoToCafeInfo(CafeRequestDto.Post post) {
        if ( post == null ) {
            return null;
        }

        Cafe cafe = new Cafe();

        cafe.setName( post.getName() );
        cafe.setAddress( post.getAddress() );
        cafe.setPhone( post.getPhone() );
        cafe.setHomepage( post.getHomepage() );
        cafe.setDescription( post.getDescription() );
        cafe.setOpenTime( post.getOpenTime() );
        cafe.setCloseTime( post.getCloseTime() );
        cafe.setMainImg( post.getMainImg() );
        cafe.setMenuImg( post.getMenuImg() );

        return cafe;
    }
}
