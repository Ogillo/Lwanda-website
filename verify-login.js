const { createClient } = require('@supabase/supabase-js');

const url = "https://ycqlttfhhcywpeagiabg.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcWx0dGZoaGN5d3BlYWdpYWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNzM3NTgsImV4cCI6MjA3ODc0OTc1OH0.qKpfk6ogIBNCETIF6kQSVvh1omptVKX08Sl5_BR1uPk";
const email = "ogillovicky70@gmail.com";
const password = "vicky@254";

const supabase = createClient(url, key);

async function testLogin() {
  console.log("Attempting login...");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Login failed:", error.message);
    if (error.message.includes("Invalid login credentials")) {
        console.log("Credentials might be wrong.");
    }
  } else {
    console.log("Login successful!");
    console.log("Role:", data.user.role);
    console.log("Metadata:", data.user.app_metadata);
  }
}

testLogin();
