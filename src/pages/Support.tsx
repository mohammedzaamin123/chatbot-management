
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, FileText, Send, Book, Video, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';

export const Support: React.FC = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    category: 'general'
  });

  const handleSubmitTicket = () => {
    toast({
      title: "Support Ticket Created",
      description: "We'll get back to you within 24 hours!"
    });
    setContactForm({ subject: '', message: '', category: 'general' });
  };

  const faqs = [
    {
      question: "How do I schedule a post?",
      answer: "You can schedule posts by going to the Scheduler page and either creating a new post with a date/time or dragging draft posts to calendar days."
    },
    {
      question: "Can I connect multiple social media accounts?",
      answer: "Yes! You can connect multiple accounts for each platform in your Settings page under Connected Accounts."
    },
    {
      question: "How does billing work?",
      answer: "We bill monthly based on your selected plan. You can view and manage your billing in the Billing section."
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold neon-text mb-2">Support Center</h1>
        <p className="text-lg text-muted-foreground">
          Get help and find answers to your questions
        </p>
      </motion.div>

      <Tabs defaultValue="help" className="space-y-6">
        <TabsList className="glass-strong border-white/10">
          <TabsTrigger value="help">Help & FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="help" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Help Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-strong border-white/10 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get instant help from our support team
                  </p>
                  <Button className="btn-primary w-full">Start Chat</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-strong border-white/10 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Browse our comprehensive guides
                  </p>
                  <Button variant="outline" className="glass border-white/20 w-full">
                    View Docs
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-strong border-white/10 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    FAQ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Find answers to common questions
                  </p>
                  <Button variant="outline" className="glass border-white/20 w-full">
                    Browse FAQ
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-strong border-white/10">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 glass rounded-lg">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-strong border-white/10">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <p className="text-muted-foreground">
                  Submit a support ticket and we'll get back to you soon
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Describe your issue briefly"
                    className="glass border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Provide details about your issue"
                    className="glass border-white/20 h-32"
                  />
                </div>
                <Button onClick={handleSubmitTicket} className="btn-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-strong border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    User Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Complete guide to using all features
                  </p>
                  <Button variant="outline" className="glass border-white/20 w-full">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-strong border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Step-by-step video walkthroughs
                  </p>
                  <Button variant="outline" className="glass border-white/20 w-full">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-strong border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Send us an email for detailed support
                  </p>
                  <Button variant="outline" className="glass border-white/20 w-full">
                    support@company.com
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
