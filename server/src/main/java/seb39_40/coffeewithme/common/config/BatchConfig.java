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

import java.time.LocalDateTime;
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
                .build();
        return job;
    }

    @Bean
    public Step deleteTempImages(){
        return stepBuilderFactory.get("deleteTempImages")
                .tasklet(((contribution, chunkContext) -> {
                    log.info("Step!");
                    List<Image> tempImages = imageService.findTempImages();
                    LocalDateTime now = LocalDateTime.now();

                    if (tempImages.size() > 0){
                        for (Image image : tempImages){
                            if (now.minusDays(1).compareTo(image.getModifiedAt()) < 0) continue;
                            imageService.delete(image.getId());
                        }
                    }
                    return RepeatStatus.FINISHED;
                })).build();
    }
}
