#! /usr/bin/env python

import os
import sys
import shutil
import fnmatch
import re


def create_dirs():
    print 'creating directories!'
    v = ['shape', 'color', 'size', 'shapecolor', 'shapesize', 'sizecolor']
    t = ['l5', 'l9', 'sa', 'tm', 'td']
    for i in v:
        for j in t:
            dirname = i + '/' + j
            print dirname
            if not os.path.exists(dirname):
                os.makedirs(dirname)


def reset_sh(basedir):
    reset ="#!/usr/bin/env sh\n" \
            "#Resets your account. While this can be the only solution sometimes,\n" \
            "#use it judiciously; it WIPES OUT all the HITs running on your account!\n"\
            "\n" \
            "#comment out the following line to reset your sandbox account\n" \
            "#$MTURKCLT/bin/resetAccount.sh -force -sandbox\n" \
            "\n" \
            "#comment out the following line to reset your production account\n" \
            "#$MTURKCLT/bin/resetAccount.sh -force\n"
    sys.stdout = open(basedir + 'reset.sh', 'w')
    print reset


def results_sh(prefix,basedir):
    successfile = "$STUDY_HOME/%s%s" % (basedir, prefix + ".success")
    outputfile = "$STUDY_HOME/%s%s" % (basedir, prefix + ".results")
    getresults = "#!/usr/bin/env sh\n" \
                 "#Collects the available HIT results. Note that this OVERWRITES\n"\
                 "#the existing results %s every time it is run.\n" \
                 "\n"\
                 "$MTURKCLT_HOME/bin/loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 "\
                 "-successfile %s -outputfile %s\n" % (outputfile, successfile, outputfile)
    sys.stdout = open(basedir + 'getResults.sh', 'w')
    print getresults


def run_sh(prefix,basedir):
    label = "$STUDY_HOME/%s%s" % (basedir, prefix)
    inp = "$STUDY_HOME/%s%s" % (basedir, prefix+'.input')
    question = "$STUDY_HOME/%s%s" % (basedir, prefix+'.question')
    prop = "$STUDY_HOME/%s%s" % (basedir, prefix+'.properties')
    # runSandbox = "#!/usr/bin/env sh\n" \
    #              "#\n"\
    #              "#\n"\
    #              "# Loads the HIT %s to run in the Amazon Mechanical Turk sandbox site.\n" \
    #              "#\n" \
    #              "#\n" \
    #              "$MTURKCLT_HOME/bin/loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 \\\n" \
    #              "-sandbox \\\n-label %s \\\n-input %s \\\n-question %s \\\n-properties %s\n" % (label, label, inp, question, prop)
    # sys.stdout = open(basedir + 'runSandbox.sh', 'w')
    # print runSandbox
    runProduction = "#!/usr/bin/env sh\n" \
                 "#\n"\
                 "#\n"\
                 "# Loads the HIT %s to run in the Amazon Mechanical Turk production site\n" \
                 "# (*** assumes service_url in $MTURKCLT_HOME/bin/mturk.properties is already set to the production site ***).\n" \
                 "#\n" \
                 "#\n" \
                 "$MTURKCLT_HOME/bin/loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 \\\n" \
                 "-label %s \\\n-input %s \\\n-question %s \\\n-properties %s\n" % (label, label, inp, question, prop)
    sys.stdout = open(basedir + 'runProduction.sh', 'w')
    print runProduction


def question_xml(prefix, basedir):
    question = '<?xml version="1.0"?>\n'\
               '<ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">\n' \
               '<!-- Upload the html interface of your HIT with its dependencies somewhere on the web, -->\n' \
               '<!-- so that it can be accessed publicly. Then point the html with its url address in the next line -->\n' \
               '<ExternalURL>%s</ExternalURL>\n' \
               '<!-- ex: <ExternalURL>//mywebsite.at.edu/myexternalhit.html</ExternalURL> -->\n' \
               '<FrameHeight>800</FrameHeight>\n' \
               '</ExternalQuestion>\n' % (prefix + '.html')
    sys.stdout = open(basedir + prefix + '.question', 'w')
    print question


def create_scripts(prefix, basedir):
    run_sh(prefix, basedir)
    results_sh(prefix,basedir)
    reset_sh(basedir)


def match_all(filelist, pattern):
    slist = []
    for s in filelist:
        if fnmatch.fnmatch(s, pattern):
           slist.append(s)
    return slist


def match(filelist, pattern):
    for s in filelist:
        if fnmatch.fnmatch(s, pattern):
            return s


def copy_multiple_files(filelist, basedir, target, prefix, ext):
    i = 0
    for fname in filelist:
        if (i > 0):
            shutil.copy(basedir + fname, target + prefix + '-' + str(i) + '.' + ext)
        else:
            shutil.copy(basedir + fname, target + prefix + '.' + ext)


def replace_in_place(pathtofile, pattern, repl):
    data = open(pathtofile).read()
    o = open(pathtofile, "w")
    o.write(re.sub(pattern, repl, data))
    o.close()


def copy_png(srcdir, html, targetdir, prefix):
    print html
    print targetdir
    data = open(srcdir+html).read()
    m = re.findall(r'src=".*\.png"', data)
    i = 0
    f = 0
    if len(m)>1:
        f = 1
    for s in m:
        m2 = re.search(r'".*\.png"', s)
        pngfile = m2.group().strip('"')
        print pngfile
        if f:
            shutil.copy(srcdir+pngfile, targetdir + prefix + '-' + str(i) + '.png')
        else:
            shutil.copy(srcdir+pngfile, targetdir + prefix + '.png')
        i += 1


def copy_and_replace(srcfile, target, prefix):
    o = open(target + prefix + '.html', "w")
    data = open(srcfile).read()
    o.write(re.sub(r'src=".*\.png"', 'src="' + prefix + '.png"', data))
    o.close()


def copy_mturk_files(src, target, prefix):
    filelist = os.listdir(src)
    inp = match(filelist, '*.input')
    shutil.copy(src+inp, target + prefix + '.input')
   #question = match(filelist, '*.question')
   #shutil.copy(src+question, target + prefix + '.question')
    question_xml(prefix, target)
    props = match(filelist, '*.properties')
    shutil.copy(src+props, target + prefix + '.properties')


def copy_html_files(src, png, html, target, prefix):
    filelist = os.listdir(src)
    s = match_all(filelist, '*.png')
    print s
    if len(s) > 1:
        copy_multiple_files(s, src, target, prefix, 'png')
    else:
        shutil.copy(src+s[0], target + prefix + '.png')
    copy_and_replace(src+html, target, prefix)


def copy_old_files():
    dict = {'shape': 'shape',
            'color': 'color',
            'size': 'size',
            'shapecolor': 'shapexcolor',
            'shapesize': 'shapexsize',
            'sizecolor': 'sizexcolor',
            'l5': 'pair5',
            'l9': 'pair9',
            'sa': 'paintatableau',
            'tm': 'triplet',
            'td': 'tripletDiff'}
    pic = {'l5': 'fivelevels',
           'l9': 'ninelevels',
           'sa': 'example',
           'tm': 'triplet',
           'td': 'tripletdiff'}

    data = {'l5': 'likert5-K',
            'l9': 'likert9-K',
            'sa': 'layout-K',
            'tm': 'tripletmatch-gnmds-K',
            'td': 'tripletid-gnmds-K'}

    v = ['shape', 'color', 'size', 'shapecolor', 'shapesize', 'sizecolor']
    t = ['l5', 'l9', 'sa', 'tm', 'td']
    for i in v:
        for j in t:
            targetdir = 'exp/' + i + '/' + j + '/'
            # src = '../samples/' + dict[i] + '-' + dict[j] + '/'
            prefix = i + '-' + j
            run_sh(prefix, targetdir)
            # copy_mturk_files(src, targetdir, prefix)
            # src = '../exp1/' + dict[i] + '/'
            # print src
            # shutil.copy(src, targetdir + prefix + '.txt')
            # html = (dict[j]).lower() + '.html'
            # copy_png(src, html, targetdir, prefix)
            # png = pic[j]
            #copy_html_files(src, png, html, targetdir, prefix)
            # replace_in_place(targetdir + prefix + '.html', r'lib/d3', '../../../lib/d3')
            # replace_in_place(targetdir + prefix + '.html', r'url\(boot', 'url(../../../lib/boot')
            # replace_in_place(targetdir + prefix + '.html', r'studyutils\.js', '../../../shared/utils.js')
            # replace_in_place(targetdir + prefix + '.html', r'tableau10\.js', '../../../shared/stim.js')
            # replace_in_place(targetdir + prefix + '.html', r'palettes\.js', '../../../shared/palettes.js')



def setup_git():
    v = ['shape', 'color', 'size', 'shapecolor', 'shapesize', 'sizecolor']
    t = ['l5', 'l9', 'sa', 'tm', 'td']
    for i in v:
        for j in t:
            basedir = 'exp/' + i + '/' + j + '/'
            prefix = i + '-' + j
            create_scripts(prefix, basedir)

# setup_git()
copy_old_files()

