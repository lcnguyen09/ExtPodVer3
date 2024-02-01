#!/bin/bash
rm -rf ExtPodOrderV3
rm -rf ExtPodOrderV3.zip
cp -r ./extension ./ExtPodOrderV3
zip -r ExtPodOrderV3.zip ./ExtPodOrderV3
rm -rf ExtPodOrderV3