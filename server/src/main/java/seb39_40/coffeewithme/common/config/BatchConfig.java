package seb39_40.coffeewithme.common.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.repository.ImageRepository;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;

import java.util.List;


@Slf4j
@Configuration
@EnableBatchProcessing
public class BatchConfig {
    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageService imageService;

    @Bean
    public Job job(){
        Job job = jobBuilderFactory.get("job")
                .start(deleteTempImages())
//                .next(deleteTempReview())
                .build();
        return job;
    }

    @Bean
    public Step deleteTempImages(){
        return stepBuilderFactory.get("deleteTempImages")
                .tasklet(((contribution, chunkContext) -> {
                    log.info("Step!");
                    List<Image> tempImages = imageService.findTempImages();

                    if (tempImages.size() > 0 && tempImages != null){
                        for (Image image : tempImages){
                            imageService.delete(image);
                        }
                    }
                    return RepeatStatus.FINISHED;
                })).build();
    }

//    @Bean
//    public Step deleteTempReview(){
//        return stepBuilderFactory.get("deleteTempReview")
//                .tasklet(((contribution, chunkContext) -> {
//                    log.info("Step!");
//                    List<Image> tempReviews = reviewService.findTempReviews();
//
//                    if (tempReviews.size() > 0 && tempReviews != null){
//                        for (Review review : tempReviews){
//                            reviewService.delete(review);
//                        }
//                    }
//                    return RepeatStatus.FINISHED;
//                })).build();
//    }
}
