import { motion } from "framer-motion";
import { Users, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
const CohortProgress = () => {
  const cohortData = {
    name: "Early Partner Cohort 1",
    status: "Cohort Progress",
    spotsTotal: 50,
    spotsFilled: 23,
  };
  const progressPercentage = (cohortData.spotsFilled / cohortData.spotsTotal) * 100;
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Card */}
          <div className="glass-card rounded-2xl p-10 text-center relative overflow-hidden">
            {/* Gradient accent */}
         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-gradient-primary/20 mb-6"
            >
              <motion.div
 
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-gradient-primary">{cohortData.status}</span>
            </motion.div>
            {/* Cohort Name */}
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
  Early Partner{" "}
  <span className="text-gradient-primary">
    Cohort 1
  </span>
</h3>
            <p className="text-muted-foreground mb-6">
             Now Onboarding
            </p>
            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Spots Filled
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {cohortData.spotsFilled} / {cohortData.spotsTotal}
                </span>
              </div>
              
              <div className="relative">
                <Progress 
                  value={progressPercentage} 
                  className="h-3 bg-muted"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPercentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
             className="absolute top-0 left-0 h-3 rounded-full bg-gradient-primary"
                  style={{ maxWidth: '100%' }}
                />
              </div>
            </div>
            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: CheckCircle, text: "Priority Support" },
                { icon: CheckCircle, text: "Exclusive Rates" },
                { icon: CheckCircle, text: "Early Features" },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <benefit.icon className="w-4 h-4 text-bg-gradient-primary" />
                  <span>{benefit.text}</span>
                </motion.div>
              ))}
            </div>
            {/* CTA Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
           className="flex items-center justify-center gap-2 text-sm font-medium bg-text-gradient-primarygradient-primary-text"
            >
              <Clock className="w-4 h-4" />
              <span>Limited spots remaining</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default CohortProgress;