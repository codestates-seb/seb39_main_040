package seb39_40.coffeewithme.common.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class BatchScheduler {
    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private BatchConfig batchConfig;

    //    @Scheduled(cron = "0 0/5 * * * *") 테스트용
    @Scheduled(cron = "0 0 6 * * SAT") //매주 토요일 오전 6시에 실행
    public void runJob(){
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameters = new JobParameters(confMap);

        try {
            jobLauncher.run(batchConfig.job(), jobParameters);
        } catch (JobExecutionAlreadyRunningException | JobInstanceAlreadyCompleteException |
                 JobParametersInvalidException | JobRestartException e) {
            log.error(e.getMessage());
        }
    }
}
