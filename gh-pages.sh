git checkout -B temp && \

cd demo/ && \
npm run build && \
cd .. && \

rm -f demo/.gitignore && \
git add demo/build && \
git commit -m 'deploy to gh-pages' && \
git push origin :gh-pages --force
git subtree push --prefix demo/build origin gh-pages
#git push origin `git subtree split --prefix build master`:gh-pages -f && \

git checkout master && \
git branch -D temp && \

echo done 0;
