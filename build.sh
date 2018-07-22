#!/bin/bash
npm run build
tar -cvf dist.tar ./dist/*
scp dist.tar root@139.159.214.95:/root/projects/fend/20180719/
