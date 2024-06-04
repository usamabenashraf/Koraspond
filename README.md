# Koraspond
mkdir hello-world-app             
cd hello-world-app
npm init -y
npm install express
npm install --save-dev eslint jest
git branch -M main
git remote set-url origin https://${{ secrets.token }}@github.com/usamabenashraf/Koraspond.git
git fetch origin main
git rebase origin/main
git push origin main  
